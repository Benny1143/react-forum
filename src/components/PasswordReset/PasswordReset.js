import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { toastr } from 'react-redux-toastr';
import { resetPassword } from 'redux/modules/auth';
import { show as showLoginModal } from 'redux/modules/modals/login';
import PasswordResetForm from '../PasswordResetForm/PasswordResetForm';
// import config from '../../config';
import Helmet from 'react-helmet';

class PasswordReset extends Component {
  static propTypes = {
    token: PropTypes.string,
    resetPassword: PropTypes.func,
    showLoginModal: PropTypes.func,
    pushState: PropTypes.func,
  };

  handleSubmit = values => {
    const { password } = values;
    const { token } = this.props;
    return this.props.resetPassword(token, password).then(() => {
      // console.log(res);
      this.props.pushState('/');
      this.props.showLoginModal();
      toastr.success(
        'Reset Password',
        'Your password has been updated. Please login again.'
      );
    });
  };

  render() {
    const { token } = this.props; // eslint-disable-line no-shadow
    // const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');

    if (!token) return <div />;

    return (
      <div className="main-section">
        <div className="page-section">
          <div className="container">
            <Helmet>
              <title>Reset Password</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-user-content">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="cs-section-title">
                        <h2>Reset Password</h2>
                      </div>
                    </div>
                    <PasswordResetForm onSubmit={this.handleSubmit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    token:
      ownProps.match && ownProps.match.params && ownProps.match.params.token,
  }),
  { resetPassword, showLoginModal, pushState: push }
)(PasswordReset);
