import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { card } from '../Forum.module.scss';
import styles from './Postcard.module.scss';

class Stats extends Component {
    static propTypes = {
        question: PropTypes.bool.isRequired,
        stats: PropTypes.shape({
            votes: PropTypes.number.isRequired,
            views: PropTypes.number.isRequired,
            answers: PropTypes.number,
            comments: PropTypes.number
        })
    }

    static defaultProps = {
        question: true,
        stats: { votes: 0, views: 0, answers: 0, comments: 0 }
    }

    render() {
        const { stats: { votes = 0, views = 0, answers = 0, comments = 0 }, question } = this.props
        return (
            <div className={styles.mainStats}>
                {!question && <div className={styles.answer}>Latest Answer: </div>}
                <div className={styles.stats}>
                    <div>
                        <div>{votes}</div>
                        <div>votes</div>
                    </div>
                    <div>
                        <div>{question ? answers : comments}</div>
                        <div>{question ? "answers" : "comments"}</div>
                    </div>
                    <div>
                        <div>{views}</div>
                        <div>views</div>
                    </div>
                </div>
            </div>
        )
    }
}

class Card extends Component {
    static propTypes = {
        question: PropTypes.bool.isRequired,
        details: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.string),
            time: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            title: PropTypes.string,
            answer: PropTypes.string,
            highlight: PropTypes.bool,
            stats: PropTypes.object.isRequired
        })
    }

    static defaultProps = { question: true }

    render() {
        const { details: { time, name, tags = [], highlight, title, answer, stats }, question } = this.props
        return (
            <div className={styles.mainCard}>
                <Stats stats={stats} question={question} />
                <div className={styles.details}>
                    {question
                        ? <div className={styles.title}><Link to="/forum/onboarding">{title}</Link></div>
                        : <div className={styles.answer}><span>{answer}</span></div>
                    }
                    <div className={styles.description}>
                        <div className={styles.tagContainer}>{tags.map((tag, i) => <div key={i}>{tag}</div>)}</div>
                        <div className={styles.information}>
                            {question && <FontAwesomeIcon icon="rss" className={cx(highlight && styles.highlight)} />}
                            <span>{question ? "asked" : "answered"} {time} ago by <Link to={`/user/${name}`}>{name}</Link></span>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon="ellipsis-v" className={styles.menu} />
            </div>
        )
    }
}

class Postcard extends Component {
    static propTypes = { details: PropTypes.shape({ question: PropTypes.object.isRequired, answer: PropTypes.object }) }

    render() {
        const { details: { question, answer } } = this.props
        return (
            <div className={cx(card, styles.mainContainer)}>
                <Card details={question} />
                {answer && <div className={styles.seperator}><hr /></div>}
                {answer && <Card details={answer} question={!answer} />}
            </div>
        )
    }
}

export default Postcard;