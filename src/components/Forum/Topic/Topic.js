import React, { Component } from 'react';
import TopicHeader from '../TopicHeader/TopicHeader';

class Topic extends Component {
    render() {
        const { match: { params: { topic } } } = this.props;
        const title = topic.charAt(0).toUpperCase() + topic.slice(1).replace("-", " ") + " Discussion"
        return (
            <div>
                <TopicHeader text={title} />
            </div>
        )
    }
}

export default Topic;