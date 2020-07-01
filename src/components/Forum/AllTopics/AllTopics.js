import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopicHeader from '../TopicHeader/TopicHeader';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AllTopics.module.scss';
import { card } from '../Forum.module.scss';
import { topics } from '../TopicList';
import { Link } from 'react-router-dom';

class Topic extends Component {
    constructor() {
        super()
        this.state = {
            subscribe: false,
            questions: 0,
            followers: 0,
            time: "10 secs"
        }
        this.subscribe = this.subscribe.bind(this)
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
    }

    subscribe = _ => this.setState(({ subscribe }) => ({ subscribe: !subscribe }))

    render() {
        const { name, icon, path } = this.props
        const { subscribe, questions, followers, time } = this.state
        return (
            <div className={cx(card, styles.topic)}>
                <div>
                    <Link to={path} className={cx(subscribe && styles.highlight)}>
                        <FontAwesomeIcon icon={icon} /><span>{name}</span>
                    </Link>
                    {time && <div>last active {time} ago</div>}
                </div>
                <div>
                    <div className={styles.stats}>
                        <div>{questions}</div>
                        <div>questions</div>
                    </div>
                    <div className={styles.stats}>
                        <div>{followers}</div>
                        <div>followers</div>
                    </div>
                    <FontAwesomeIcon icon="rss" onClick={this.subscribe} className={cx(subscribe && styles.highlight)} />
                </div>
            </div>
        )
    }
}

class AllTopics extends Component {
    render() {
        return (
            <div>
                <TopicHeader text="SmartGuppy Forum - All Topics" />
                {topics.map(({ name, icon, path }, i) => <Topic name={name} icon={icon} path={path} key={i} />)}
            </div>
        )
    }
}

export default AllTopics;