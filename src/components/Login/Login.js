import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  handleSubmit = event => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  };

  render() {
    const { user, logout } = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <h1>Login</h1>
        {!user && (
          <div>
            <form
              className="login-form form-inline"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <input
                  type="text"
                  ref="username"
                  placeholder="Enter a username"
                  className="form-control"
                />
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}>
                <i className="fa fa-sign-in" /> Log In
              </button>
            </form>
            <p>
              This will "log you in" as this user, storing the username in the
              session of the API server.
            </p>
          </div>
        )}
        {user && (
          <div>
            <p>You are currently logged in as {user.name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}>
                <i className="fa fa-sign-out" /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  authActions
)(Login);
