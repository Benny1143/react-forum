import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LeftSideBar.module.scss';

class SideItemComponent extends Component {
    static propTypes = {
        pushState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        path: PropTypes.string
    }

    static defaultProps = { path: undefined }

    goTo = (location) => this.props.pushState(`/forum/${location}`)

    render() {
        const { name, icon, path, match: { params: { to } } } = this.props
        return (
            <div className={cx(styles.sideItem, to === path && styles.highlight)} onClick={() => this.goTo(path || "")}>
                <div>
                    <FontAwesomeIcon icon={icon} />
                </div>
                <span>{name}</span>
            </div>
        )
    }
}

const SideItem = withRouter(connect(null, { pushState: push })(SideItemComponent));

class LeftSideBar extends Component {
    constructor() {
        super()
        this.state = {
            items: [{
                name: 'Physics',
                icon: 'apple-alt'
            }, {
                name: 'Chemistry',
                icon: 'flask'
            }, {
                name: 'Biology',
                icon: 'biohazard'
            }, {
                name: 'Learning Styles',
                icon: 'graduation-cap'
            }, {
                name: 'Writing Tips',
                icon: 'pencil-alt'
            }, {
                name: 'CCA',
                icon: 'swimmer'
            }].concat([{
                name: 'All Topics',
                icon: 'list'
            }])
        }
    }

    render() {
        const { items } = this.state
        return (
            <div className={styles.mainContainer}>
                <SideItem name="Personal Feed" icon="home" />
                <span>YOUR SUBJECTS & INTERESTS</span>
                <div className={styles.listContainer}>
                    {items.map(({ name, icon }) =>
                        <SideItem name={name} icon={icon} key={name} path={name.toLowerCase().replace(" ", "-")} />
                    )}
                </div>
            </div>
        )
    }
}

export default LeftSideBar;