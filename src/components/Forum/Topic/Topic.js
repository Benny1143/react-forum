import React, { Component } from 'react';
import TopicHeader from '../TopicHeader/TopicHeader';
import { pathToName } from '../TopicList';
import { searchPost } from '../ExampleTopicAPI';
import Postcard from '../Postcard/Postcard';

class Topic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: "",
            title: "",
            posts: [],
            search: "",
            select: "active"
        }
        this.onSearch = this.onSearch.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }


    loadTopic() {
        const topic = pathToName(this.props.match.params.topic)
        this.setState({
            topic,
            posts: searchPost(topic),
            title: `${topic} Discussion`,
            search: "",
            select: "active"
        })
    }

    onSearch = search => this.setState(({ topic, select }) => ({
        search, posts: searchPost(topic, search, select)
    }));

    onSelect = select => this.setState(({ topic, search }) => ({
        select, posts: searchPost(topic, search, select)
    }));

    componentDidUpdate(prevProps) {
        if (this.props.match.params.topic !== prevProps.match.params.topic) this.loadTopic()
    }

    componentDidMount() {
        this.loadTopic()
    }

    render() {
        const { posts, title, search, select } = this.state
        return (
            <div>
                <TopicHeader text={title} search={this.onSearch} searchVal={search} select={this.onSelect} selectVal={select} />
                {posts && posts.length > 0
                    ? posts.map(post => <Postcard key={post.question.title} post={post} />)
                    : <div>No post</div>}
            </div>
        )
    }
}

export default Topic;