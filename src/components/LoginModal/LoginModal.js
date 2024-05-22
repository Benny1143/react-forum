import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
// import FacebookLogin from 'react-facebook-login';
import * as authActions from 'redux/modules/auth';
import { hide } from 'redux/modules/modals/login';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { show as showForgotModal } from 'redux/modules/modals/forgot';
import LoginForm from '../LoginForm/LoginForm';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

class LoginModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    hide: PropTypes.func,
    showSignupModal: PropTypes.func,
    showForgotModal: PropTypes.func,
    login: PropTypes.func,
    loginFacebook: PropTypes.func,
    loginGoogle: PropTypes.func,
  };

  handleHide = () => {
    this.props.hide();
    if (this.props.modal.cancel) this.props.modal.cancel();
  };

  handleSignup = event => {
    event.preventDefault();
    this.props.hide();
    this.props.showSignupModal();
  };

  handleForgotPassword = event => {
    event.preventDefault();
    this.props.hide();
    this.props.showForgotModal();
  };

  handleLogin = ({ email, password }) => {
    return this.props.login(email, password).then(() => {
      this.props.hide();
      toastr.success('Successful Login', 'Welcome to SmartGuppy!');
    });
  };

  handleFacebook = data => {
    const { status } = data;
    if (status === 'connected') {
      this.props
        .loginFacebook(data)
        .then(() => {
          this.props.hide();
          toastr.success('Successful Login', 'Welcome to SmartGuppy!');
        })
        .catch(reason => {
          // throw new SubmissionError({ _error: reason.message });
        });
    } else {
      this.props.hide();
      toastr.error('Failed Login', 'Failed to sign in through Facebook!');
    }
  };

  handleGoogle = data => {
    const { error } = data;
    if (!error) {
      this.props
        .loginGoogle(data)
        .then(() => {
          this.props.hide();
          toastr.success('Successful Login', 'Welcome to SmartGuppy!');
        })
        .catch(reason => {
          // throw new SubmissionError({ _error: reason.message });
        });
    } else {
      this.props.hide();
      toastr.error('Failed Login', 'Failed to sign in through Google!');
    }
  };

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal show={modal.visible} onHide={this.handleHide} container={this}>
          <Modal.Header closeButton />
          <Modal.Body>
            <h4>User Sign in</h4>
            <LoginForm onSubmit={this.handleLogin} />
          </Modal.Body>
          <Modal.Footer>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="btn-forgot-pass"
              tabIndex="0"
              aria-hidden="true"
              onClick={this.handleForgotPassword}
            >
              <i className=" icon-question-circle" /> Forgot password?
            </a>
            <div className="cs-separator">
              <span>or</span>
            </div>
            <div className="cs-user-social">
              <em>Sign in with your Social Network</em>
              <ul>
                <li>
                  <FacebookLogin
                    fields="id,name,email,link"
                    onResponse={this.handleFacebook}
                    text="facebook"
                  />
                </li>
                <li>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    text="google"
                    onSuccess={this.handleGoogle}
                    onFailure={this.handleGoogle}
                  />
                </li>
                {/*
                  <li><a tabIndex="0" data-original-title="twitter"><i className="icon-twitter4"></i>twitter</a></li>
                  <li><a tabIndex="0" data-original-title="google-plus"><i className="icon-google4"></i>google</a></li>
                */}
              </ul>
            </div>
            <div className="cs-user-signup">
              <i className="icon-add-user" />
              <strong>Not a Member yet?&nbsp;</strong>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="cs-color"
                tabIndex="0"
                aria-hidden="true"
                onClick={this.handleSignup}
              >
                Signup Now
              </a>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    modal: state.modals.login,
  }),
  dispatch =>
    bindActionCreators(
      { hide, showSignupModal, showForgotModal, ...authActions },
      dispatch
    )
)(LoginModal);
