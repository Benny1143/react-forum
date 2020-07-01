import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TopicHeader.module.scss';

class TopicHeader extends Component {
    constructor() {
        super()
        this.state = {
            dropdown: false,
            select: "sub",
            search: ""
        }
        this.dropdown = this.dropdown.bind(this)
        this.dropdownBlur = this.dropdownBlur.bind(this)
        this.select = this.select.bind(this)
        this.search = this.search.bind(this)
    }

    static propTypes = {
        search: PropTypes.func,
        select: PropTypes.func
    }

    dropdown = _ => this.setState(({ dropdown }) => ({ dropdown: !dropdown }))

    dropdownBlur = _ => this.setState({ dropdown: false })

    select = ({ currentTarget: { value: select } }) => {
        this.setState({ select })
        this.props.select(select)
    }

    search = ({ target: { value: search } }) => {
        this.setState({ search })
        this.props.search(search)
    }

    render() {
        const { text } = this.props
        const { dropdown, select, search } = this.state
        return (
            <div className={styles.mainContainer}>
                <div className={styles.header}>{text}</div>
                <div className={styles.form}>
                    <input type="text" placeholder="Search..." onChange={this.search} value={search} />
                    <div>
                        <label htmlFor="dropdown">Sort By</label>
                        <select id="dropdown" onClick={this.dropdown} onBlur={this.dropdownBlur} onChange={this.select} value={select}>
                            <option value="sub">Subscription</option>
                            <option value="active">Last Active</option>
                        </select>
                        <FontAwesomeIcon icon={"chevron-" + (dropdown ? "up" : "down")} />
                    </div>

                </div>
            </div>
        )
    }
}

export default TopicHeader;