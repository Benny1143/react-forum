import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LeftSideBar.module.scss';
import { topicToObject } from '../TopicList';
import { Link } from 'react-router-dom';

class SideItemComponent extends Component {
    static propTypes = {
        pushState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        match: PropTypes.shape({ url: PropTypes.string.isRequired })
    }

    static defaultProps = { path: undefined }

    render() {
        const { name, icon, path, match: { url } } = this.props
        return (
            <Link className={cx(styles.sideItem, url === path && styles.highlight)} to={path}>
                <div>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <span>{name}</span>
            </Link>
        )
    }
}

const SideItem = withRouter(connect(null, { pushState: push })(SideItemComponent));

class LeftSideBar extends Component {
    constructor() {
        super()
        this.state = { items: topicToObject(['Physics', 'Chemistry', 'Biology', 'Learning Styles', 'Writing Tips', 'CCA']) }
    }

    render() {
        const { items } = this.state
        return (
            <div className={styles.mainContainer}>
                <SideItem name="Personal Feed" icon="home" path="/forum" />
                <span>YOUR SUBJECTS & INTERESTS</span>
                <div className={styles.listContainer}>
                    {items.map(({ name, icon, path }) => <SideItem name={name} icon={icon} key={name} path={path} />)}
                    <SideItem name="All Topics" icon="list" path='/forum/all-topics' />
                </div>
            </div>
        )
    }
}

export default LeftSideBar;