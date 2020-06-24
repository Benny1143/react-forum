import React, { Component } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './LeftSideBar.module.scss'

const SideItem = ({ name, icon, selected }) =>
    <div className={cx(styles.sideItem, selected && styles.highlight)}>
        <div>
            <FontAwesomeIcon icon={icon} />
        </div>
        <span>{name}</span>
    </div>

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
        const { items } = this.state;
        return (
            <div className={styles.mainContainer}>
                <SideItem name="Personal Feed" icon="home" selected />
                <span>YOUR SUBJECTS & INTERESTS</span>
                <div className={styles.listContainer}>
                    {items.map(({ name, icon }) =>
                        <SideItem name={name} icon={icon} key={name} />
                    )}
                </div>
            </div>
        )
    }
}


export default LeftSideBar;