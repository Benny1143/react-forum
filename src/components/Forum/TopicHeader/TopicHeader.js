import React, { Component } from 'react';
import styles from './TopicHeader.module.scss';

class TopicHeader extends Component {
    render() {
        const { text } = this.props
        return (
            <div className={styles.mainContainer}>
                <div className={styles.header}>{text}</div>
            </div>
        )
    }
}

export default TopicHeader;