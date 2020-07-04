import React, { Component } from 'react';
import styles from './Question.module.scss';
import { Link } from 'react-router-dom';
import { path } from '../TopicList';
import { getPost } from '../ExampleTopicAPI';

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: getPost(parseInt(props.match.params.id))
        }
    }

    render() {
        const { topic = "Secondary School" } = this.props
        const { post: { question: { title } } } = this.state
        return (
            <div className={styles.mainContainer}>
                <div className={styles.breadcrumbs}>
                    <Link to="/forum/all-topics">All Topics</Link> /
                    <Link to={path(topic)}>{topic} Discussion</Link> / <span>{title}</span>
                </div>
            </div>
        )
    }
}

export default Question;