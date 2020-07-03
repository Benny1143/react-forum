import React, { Component } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { card } from '../Forum.module.scss';
import styles from './Post.module.scss';
import UserImg from '../UserImg/UserImg';
import Postcard from '../Postcard/Postcard';
import { homeFeed } from '../ExampleTopicAPI';

class Post extends Component {
    constructor() {
        super()
        this.state = { input: "" }
        this.handleInput = this.handleInput.bind(this)
        this.handlePost = this.handlePost.bind(this)
    }

    handleInput = (event) => this.setState({ input: event.target.value });

    handlePost = () => console.log(this.state.input)

    render() {
        const input = this.state.input;
        const cards = homeFeed()
        return (
            <div>
                <div className={cx(card, styles.post)}>
                    <div>
                        <UserImg />
                        <input
                            type="text"
                            placeholder="What's your question or &quot;aha&quot; moment?"
                            value={input}
                            onChange={this.handleInput}
                        />
                    </div>
                    <div>
                        <FontAwesomeIcon icon="tags" />
                        <button onClick={this.handlePost} disabled={!input}>POST</button>
                    </div>
                </div>
                {cards.map((details, i) => <Postcard key={i} details={details} />)}
            </div>
        )
    }
}

export default Post;