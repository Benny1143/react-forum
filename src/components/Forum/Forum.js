import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Forum.module.scss';
import LeftSideBar from './LeftSideBar/LeftSideBar';


class Forum extends Component {
    render() {
        return (
            <div className={cx(styles.mainContainer, "container")}>
                <div className="col-lg-2" style={{ padding: 10 }}>
                    <div className={styles.shadow}>
                        <LeftSideBar />
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className={styles.cardlist}>
                        <div className={styles.card}>
                            Main
                        </div>
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