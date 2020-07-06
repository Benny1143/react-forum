import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
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
            votes: props.votes,
            upvote: props.vote === 'up',
            downvote: props.vote === 'down',
            acceptedAnswer: props.acceptedAnswer,
            hasAcceptedAnswer: props.hasAcceptedAnswer
        }
        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
        this.checkAnswer = this.checkAnswer.bind(this)
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        votes: PropTypes.number,
        vote: PropTypes.string,
        isOwner: PropTypes.bool,
        isQuestion: PropTypes.bool,
        acceptedAnswer: PropTypes.bool,
        hasAcceptedAnswer: PropTypes.bool,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                comment: PropTypes.string.isRequired,
                votes: PropTypes.number.isRequired,
                vote: PropTypes.bool.isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        onCheck: PropTypes.func
    }

    static defaultProps = {
        avatar: "",
        tags: [],
        votes: 0,
        vote: null,
        isOwner: false,
        isQuestion: false,
        acceptedAnswer: false,
        hasAcceptedAnswer: false
    }

    componentDidUpdate({ votes, hasAcceptedAnswer }) {
        if (votes !== this.props.votes) this.setState({ votes: this.props.votes })
        else if (hasAcceptedAnswer !== this.props.hasAcceptedAnswer) this.setState({ hasAcceptedAnswer: this.props.hasAcceptedAnswer })
    }

    upvote = _ => {
        if (this.state.upvote) this.setState(({ votes }) => ({ votes: votes - 1, upvote: false }))
        else this.setState(({ votes, downvote }) => ({ votes: votes + (downvote ? 2 : 1), upvote: true, downvote: false }))
    }

    downvote = _ => {
        if (this.state.downvote) this.setState(({ votes }) => ({ votes: votes + 1, downvote: false }))
        else this.setState(({ votes, upvote }) => ({ votes: votes - (upvote ? 2 : 1), downvote: true, upvote: false }))
    }

    checkAnswer = _ => {
        const { acceptedAnswer, hasAcceptedAnswer } = this.state
        if (this.props.isOwner) {
            if (acceptedAnswer && hasAcceptedAnswer) this.setState({ acceptedAnswer: false, hasAcceptedAnswer: false })
            else if (!acceptedAnswer && !hasAcceptedAnswer) this.setState({ acceptedAnswer: true, hasAcceptedAnswer: true })
            this.props.onCheck()
        }
    }

    render() {
        const { votes, upvote, downvote, acceptedAnswer, hasAcceptedAnswer } = this.state
        const { text, time, name, avatar, tags, isOwner, isQuestion } = this.props
        const CheckButton = ({ className }) => <FontAwesomeIcon icon="check" onClick={this.checkAnswer} className={cx(isOwner && styles.clickable, className)} />
        return (
            <div className={cx(card, styles.card, acceptedAnswer && styles.highlight)}>
                <div className={styles.arrow}>
                    <div className={cx(styles.up, !upvote && styles.unvote)} onClick={this.upvote}></div>
                    <div className={styles.votes}>{votes}</div>
                    <div className={cx(styles.down, !downvote && styles.unvote)} onClick={this.downvote}></div>
                    {!isQuestion && acceptedAnswer
                        ? <CheckButton className={acceptedAnswer && styles.highlight} />
                        : isOwner && !hasAcceptedAnswer && <CheckButton />
                    }
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
                    <div className={styles.username}><UserImg width={24} alt={{ name, avatar }} /><span>{name}</span></div>
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
            topic: "",
            question: {},
            answers: [],
            hasAcceptedAnswer: false,
            orderBy: "Votes"
        }
        this.orderBy = this.orderBy.bind(this)
        this.onCheck = this.onCheck.bind(this)
    }

    orderBy = ({ target }) => this.setState({ orderBy: target.innerHTML });

    fetchPost = _ => this.setState({ ...getPost(parseInt(this.props.match.params.id)) })

    onCheck = _ => this.setState(({ hasAcceptedAnswer }) => ({ hasAcceptedAnswer: !hasAcceptedAnswer }))

    componentDidMount() {
        this.fetchPost()
    }

    render() {
        const { question: { title, time, views }, topic, question, answers, hasAcceptedAnswer, orderBy } = this.state
        const active = "today"
        const isOwner = true
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
                {!isEmpty(question) && <Card {...question} isQuestion={true} />}
                <div className={styles.mid}>
                    <span>{answers.length} Answers</span>
                    <div className={styles.buttons}>
                        {this.orders.map(order => <div onClick={this.orderBy} key={order} className={cx(orderBy === order && styles.highlight)}>{order}</div>)}
                    </div>
                </div>
                {answers.map((answer, i) => <Card {...answer} key={i} hasAcceptedAnswer={hasAcceptedAnswer} isOwner={isOwner} onCheck={this.onCheck} />)}
            </div>
        )
    }
}

export default Question;