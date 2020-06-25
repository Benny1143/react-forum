import React, { Component } from 'react';
import cx from 'classnames';
import { Route, Switch } from 'react-router-dom';
import styles from './Forum.module.scss';
import LeftSideBar from './LeftSideBar/LeftSideBar';
import Post from './Post/Post'
import AllTopics from './AllTopics/AllTopics';
import Topic from './Topic/Topic';

class Forum extends Component {
    render() {
        const baseURl = "/forum"
        return (
            <div className={cx(styles.mainContainer, "container")}>
                <div className="col-lg-2" style={{ paddingRight: 10 }}>
                    <div className={styles.shadow}>
                        <LeftSideBar />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className={styles.cardlist}>
                        <Switch>
                            <Route path={`${baseURl}/:topic`} component={Topic} />
                            <Route path={`${baseURl}/all-topics`} component={AllTopics} />
                            <Route path={`${baseURl}`} component={Post} />
                        </Switch>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className={styles.shadow}>
                        Right side
                    </div>
                </div>
            </div>
        );
    }
}

export default Forum;