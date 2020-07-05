import React, { Component } from 'react';
import styles from './Question.module.scss';
import { Link } from 'react-router-dom';
import { path } from '../TopicList';
import { getPost } from '../ExampleTopicAPI';
import cx from 'classnames';
import { card } from '../Forum.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImg from '../UserImg/UserImg';

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            votes: props.info.stats.votes || 0,
            upvote: false,
            downvote: false
        }
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
    }

    upvote = _ => {
        if (this.state.upvote) this.setState(({ votes }) => ({ votes: votes - 1, upvote: false }))
        else this.setState(({ votes, downvote }) => ({ votes: votes + (downvote ? 2 : 1), upvote: true, downvote: false }))
    }

    downvote = _ => {
        if (this.state.downvote) this.setState(({ votes }) => ({ votes: votes + 1, downvote: false }))
        else this.setState(({ votes, upvote }) => ({ votes: votes - (upvote ? 2 : 1), downvote: true, upvote: false }))
    }

    render() {
        const { votes, upvote, downvote } = this.state
        const { text = "", time, name, tags = [] } = this.props.info
        return (
            <div className={cx(card, styles.card)}>
                <div className={styles.arrow}>
                    <div className={cx(styles.up, !upvote && styles.unvote)} onClick={this.upvote}></div>
                    <div className={styles.votes}>{votes}</div>
                    <div className={cx(styles.down, !downvote && styles.unvote)} onClick={this.downvote}></div>
                </div>
                <div className={styles.main}>
                    <div className={styles.text}>{text}</div>
                    {tags.length > 0 && <div className={styles.tags}>{tags.map((tag, i) => <div key={i}>{tag}</div>)}</div>}
                    <div className={styles.comments}>
                        <span className={styles.add}>add a comment</span>
                    </div>
                </div>
                <FontAwesomeIcon icon="ellipsis-v" className={styles.menu} />
                <div className={styles.user}>
                    <div className={styles.time}>asked {time} ago</div>
                    <div className={styles.username}><UserImg width={24} /><span>{name}</span></div>
                </div>
            </div>
        )
    }
}

class Question extends Component {
    constructor(props) {
        super(props)
        this.orders = ["Active", "Oldest", "Votes"]
        this.state = {
            post: getPost(parseInt(props.match.params.id)),
            orderBy: "Votes"
        }
        this.orderBy = this.orderBy.bind(this)
    }

    orderBy = ({ target }) => this.setState({ orderBy: target.innerHTML });

    render() {
        const { post: { question: { title, time, stats: { views } }, topic, question, answers = [] }, orderBy } = this.state
        const active = "today"
        return (
            <div className={styles.mainContainer}>
                <div className={styles.breadcrumbs}>
                    <Link to="/forum/all-topics">All Topics</Link> / <Link to={path(topic)}>{topic} Discussion</Link> / <span>{title}</span>
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.stats}>
                    <div>asked <span>{time} ago</span></div>
                    <div>last <span>active {active}</span></div>
                    <div>viewed <span>{views} times</span></div>
                </div>
                <Card info={question} />
                <div className={styles.mid}>
                    <span>{answers.length} Answers</span>
                    <div className={styles.buttons}>
                        {this.orders.map(order => <div onClick={this.orderBy} key={order} className={cx(orderBy === order && styles.highlight)}>{order}</div>)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Question;