import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { push } from 'connected-react-router';
import { Modal } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import * as authActions from 'redux/modules/auth';
import { hide } from 'redux/modules/modals/signup';
import { show as showLoginModal } from 'redux/modules/modals/login';
import SignupForm from '../SignupForm/SignupForm';
import FacebookLogin from '../FacebookLogin/FacebookLogin';
import GoogleLogin from '../GoogleLogin/GoogleLogin';

class SignupModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    hide: PropTypes.func,
    showLoginModal: PropTypes.func,
    signup: PropTypes.func,
    loginFacebook: PropTypes.func,
    loginGoogle: PropTypes.func,
  };

  handleHide = () => {
    this.props.hide();
    if (this.props.modal.cancel) this.props.modal.cancel();
  };

  handleLogin = event => {
    event.preventDefault();
    this.props.hide();
    this.props.showLoginModal();
  };

  handleSignup = values => {
    const { name, email, password } = values;
    return this.props.signup({ name, email, password }).then(() => {
      this.props.hide();
      this.props.pushState('/settings');
      toastr.success(
        'Successful Registration',
        'Welcome to SmartGuppy! Let us help you by filling up your profile settings.'
      );
    });
  };

  handleFacebook = data => {
    const { status } = data;
    if (status === 'connected') {
      this.props
        .loginFacebook(data)
        .then(() => {
          this.props.hide();
          this.props.pushState('/settings');
          toastr.success(
            'Successful Login',
            'Welcome to SmartGuppy! Let us help you by filling up your profile settings.'
          );
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
          this.props.pushState('/settings');
          toastr.success(
            'Successful Login',
            'Welcome to SmartGuppy! Let us help you by filling up your profile settings.'
          );
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
            <h4>Create Account</h4>
            <SignupForm onSubmit={this.handleSignup} />
            {/* <div className="cs-login-form">
              <form>
                <div className="input-holder">
                  <label className="has-success" htmlFor="cs-name">
                    <strong>Name</strong>
                    <i className="icon-user"></i>
                    <input type="text" className="" id="cs-name" placeholder="Type name" />
                  </label>
                </div>
                <div className="input-holder">
                  <label className="has-success" htmlFor="cs-email">
                    <strong>Email</strong>
                    <i className="icon-envelope"></i>
                    <input type="email" className="" id="cs-email" placeholder="Type desired username" />
                  </label>
                </div>
                <div className="input-holder">
                  <label htmlFor="cs-login-password">
                    <strong>Password</strong>
                    <i className="icon-lock"></i>
                    <input type="password" id="cs-login-password" placeholder="******" />
                  </label>
                </div>
                <div className="input-holder">
                  <label htmlFor="cs-confirm-password">
                    <strong>Confirm password</strong>
                    <i className="icon-lock"></i>
                    <input type="password" id="cs-confirm-password" placeholder="******" />
                  </label>
                </div>
                <div className="input-holder">
                  <button className="cs-color csborder-color" type="submit" onClick={this.handleSignup}>Create Account</button>
                </div>
              </form>
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <a href="# " aria-hidden="true" onClick={this.handleLogin}>
              Already have account
            </a>
            <div className="cs-separator">
              <span>or</span>
            </div>
            <div className="cs-user-social">
              <em>Sign up with your Social Networks</em>
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
              By signing up, you agree to Smartguppy's{' '}
              <NavLink to="/terms-of-use" onClick={this.handleHide}>
                Terms of Service
              </NavLink>{' '}
              &{' '}
              <NavLink to="/privacy-policy" onClick={this.handleHide}>
                Privacy Policy
              </NavLink>
              . We will <b>never</b> post to Facebook without your permission.
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    modal: state.modals.signup,
  }),
  dispatch =>
    bindActionCreators(
      { pushState: push, hide, showLoginModal, ...authActions },
      dispatch
    )
)(SignupModal);
