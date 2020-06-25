import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './LeftSideBar.module.scss';

class SideItemComponent extends Component {
    constructor() {
        super()
        this.goTo = this.goTo.bind(this)
    }

    static propTypes = {
        pushState: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        path: PropTypes.string
    }

    static defaultProps = { path: undefined }

    goTo = (event) => this.props.pushState(event.currentTarget.dataset.tag ? `/forum/${event.currentTarget.dataset.tag}` : "/forum")

    render() {
        const { name, icon, path, match: { params: { to } } } = this.props
        return (
            <div className={cx(styles.sideItem, to === path && styles.highlight)} onClick={this.goTo} data-tag={path}>
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
            }]).map(a => ({ ...a, path: a.name.toLowerCase().replace(" ", "-") }))
        }
    }

    render() {
        const { items } = this.state
        return (
            <div className={styles.mainContainer}>
                <SideItem name="Personal Feed" icon="home" />
                <span>YOUR SUBJECTS & INTERESTS</span>
                <div className={styles.listContainer}>
                    {items.map(({ name, icon, path }) =>
                        <SideItem name={name} icon={icon} key={name} path={path} />
                    )}
                </div>
            </div>
        )
    }
}

export default LeftSideBar;