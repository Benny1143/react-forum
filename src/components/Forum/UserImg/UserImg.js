import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UserImg extends Component {
    static propTypes = {
        user: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string
        }),
        alt: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string
        }),
        width: PropTypes.number
    };

    static defaultProps = {
        width: 20
    }

    render() {
        const { avatar, name } = this.props.alt || this.props.user || {}
        return (
            <div className="cs-user-login">
                <div className="cs-media" style={{ marginLeft: 0, width: this.props.width, height: this.props.width, display: "flex" }}>
                    <figure style={{ display: "flex" }}>
                        <img src={avatar || require('assets/img/avatar.png')} alt={name} />
                    </figure>
                </div>
            </div>
        )
    }
}

export default connect(({ entities: { users }, auth: { user } }) => ({ user: user && users[user] }))(UserImg)
