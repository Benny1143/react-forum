import React, { Component } from 'react';

class Topic extends Component {
    render() {
        const { match: { params: { topic } } } = this.props;
        return (
            <div>
                {topic}
            </div>
        )
    }
}

export default Topic;