import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopicHeader from '../TopicHeader/TopicHeader';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AllTopics.module.scss';
import { card } from '../Forum.module.scss';
import { topics } from '../TopicList';
import { Link } from 'react-router-dom';

class DateText extends Component {
    setNumberText = time => {
        const seconds = Math.abs(Math.round(((new Date()).getTime() - time.getTime()) / 1000))
        if (seconds >= 60) {
            if (seconds >= 60 * 60) {
                if (seconds >= 60 * 60 * 12) {
                    this.number = Math.abs(Math.round(seconds / (60 * 60 * 12)))
                    this.text = "day"
                } else {
                    this.number = Math.abs(Math.round(seconds / (60 * 60)))
                    this.text = "hr"
                }
            } else {
                this.number = Math.abs(Math.round(seconds / 60))
                this.text = "min"
            }
        } else {
            this.number = seconds
            this.text = "sec"
        }
    }

    render() {
        this.setNumberText(this.props.active)
        return (<span>{this.number} {this.text}{this.number > 1 && 's'}</span>)
    }
}

class Topic extends Component {
    constructor() {
        super()
        this.state = {
            subscribe: false,
            questions: 0,
            followers: 0
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
        const { name, icon, path, active } = this.props
        const { subscribe, questions, followers } = this.state
        return (
            <div className={cx(card, styles.topic)}>
                <div>
                    <Link to={path} className={cx(subscribe && styles.highlight)}>
                        <FontAwesomeIcon icon={icon} /><span>{name}</span>
                    </Link>
                    {active && <div>last active <DateText active={active} /> ago</div>}
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
    constructor() {
        super()
        this.state = {
            search: "",
            select: "active",
            list: topics.map(a => {
                if (a.name === "Physics") {
                    let t = new Date()
                    t.setSeconds(t.getSeconds() - 100)
                    return { ...a, active: t }
                } else return { ...a, active: new Date() }
            })
        }
        this.search = this.search.bind(this)
        this.select = this.select.bind(this)
    }

    search = search => this.setState({ search });

    select = select => this.setState({ select });

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { search, select, list } = this.state
        let listTopics = list
        if (search) listTopics = listTopics.filter(({ name }) => name.toLowerCase().includes(search))
        if (select === 'active') listTopics.sort(({ active }) => active)
        return (
            <div>
                <TopicHeader text="SmartGuppy Forum - All Topics" search={this.search} select={this.select} />
                {listTopics.map(({ name, icon, path, active }) => <Topic name={name} icon={icon} path={path} key={name} active={active} />)}
            </div>
        )
    }
}

export default AllTopics;