import React, { Component } from 'react';
import TopicHeader from '../TopicHeader/TopicHeader';
import { pathToName } from '../TopicList';

class Topic extends Component {
    render() {
        const { match: { params: { topic } } } = this.props;
        const title = pathToName(topic) + " Discussion"
        return (
            <div>
                <TopicHeader text={title} />
            </div>
        )
    }
}

export default Topic;