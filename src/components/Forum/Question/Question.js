import React, { Component } from 'react';
import styles from './Question.module.scss';
import { Link } from 'react-router-dom';
import { path } from '../TopicList';

class Question extends Component {
    render() {
        const { topic = "Secondary School", question = "How do you do well for “N” Levels?" } = this.props
        return (
            <div className={styles.mainContainer}>
                <div className={styles.breadcrumbs}>
                    <Link to="/forum/all-topics">All Topics</Link> /
                    <Link to={path(topic)}>{topic} Discussion</Link> / <span>{question}</span>
                </div>
            </div>
        )
    }
}

export default Question;