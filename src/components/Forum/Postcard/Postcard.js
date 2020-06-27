import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { card } from '../Forum.module.scss';
import styles from './Postcard.module.scss';


const Stats = ({ stats: { votes, answers, views } }) =>
    <div className={styles.stats}>
        <div>
            <div>{votes}</div>
            <div>votes</div>
        </div>
        <div>
            <div>{answers}</div>
            <div>answers</div>
        </div>
        <div>
            <div>{views}</div>
            <div>views</div>
        </div>
    </div>

class Postcard extends Component {
    render() {
        const { time, name, tags, highlight, title, stats } = this.props.details
        return (
            <div className={cx(card, styles.mainContainer)}>
                <Stats stats={stats} />
                <div className={styles.details}>
                    <div className={styles.title}><Link to="/forum/onboarding">{title}</Link></div>
                    <div className={styles.description}>
                        <div className={styles.tagContainer}>{tags.map((tag, i) => <div key={i}>{tag}</div>)}</div>
                        <div className={styles.information}>
                            <FontAwesomeIcon icon="rss" className={cx(highlight && styles.highlight)} />
                            <span>asked {time} ago by <Link to={`/user/${name}`}>{name}</Link></span>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon icon="ellipsis-v" className={styles.menu} />
            </div>
        )
    }

}

export default Postcard;