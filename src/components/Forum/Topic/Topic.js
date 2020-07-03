import React, { Component } from 'react';
import TopicHeader from '../TopicHeader/TopicHeader';
import { pathToName } from '../TopicList';
import { searchPost } from '../ExampleTopicAPI';
import Postcard from '../Postcard/Postcard';

class Topic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            posts: [],
            search: "",
            select: "active"
        }
    }

    loadTopic() {
        const topic = pathToName(this.props.match.params.topic);
        this.setState(({ search, select }) => ({
            posts: searchPost(topic, search, select),
            title: `${topic} Discussion`
        }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.topic !== prevProps.match.params.topic) this.loadTopic()
    }

    componentDidMount() {
        this.loadTopic()
    }

    render() {
        const { posts, title } = this.state
        return (
            <div>
                <TopicHeader text={title} />
                {posts && posts.length > 0
                    ? posts.map(post => <Postcard key={post.question.title} post={post} />)
                    : <div>No post</div>}
            </div>
        )
    }
}

export default Topic;