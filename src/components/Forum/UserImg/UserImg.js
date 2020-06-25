import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserImg extends Component {
    render() {
        const { user: { avatar, name } } = this.props
        return (
            <div className="cs-user-login">
                <div className="cs-media" style={{ marginLeft: 0, width: 20 }}>
                    <figure>
                        <img src={avatar || require('assets/img/avatar.png')} alt={name} />
                    </figure>
                </div>
            </div>
        )
    }
}

export default connect(({ entities: { users }, auth: { user } }) => ({ user: user && users[user] }))(UserImg)
