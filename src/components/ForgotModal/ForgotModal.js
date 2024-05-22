import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import * as authActions from 'redux/modules/auth';
import { hide } from 'redux/modules/modals/forgot';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import ForgotForm from '../ForgotForm/ForgotForm';

class ForgotModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    hide: PropTypes.func,
    showSignupModal: PropTypes.func,
    forgotPassword: PropTypes.func,
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

  handleSubmit = values => {
    const { email } = values;
    return this.props.forgotPassword(email).then(() => {
      this.props.hide();
      toastr.warning(
        'Forgot Password',
        'Please check your email to reset your password.'
      );
    });
  };

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal show={modal.visible} onHide={this.handleHide} container={this}>
          <Modal.Header closeButton />
          <Modal.Body>
            <h4>Forgot Password</h4>
            <ForgotForm onSubmit={this.handleSubmit} />
          </Modal.Body>
          <Modal.Footer>
            <div className="cs-user-signup">
              <i className="icon-add-user" />
              <strong>Not a Member yet?&nbsp;</strong>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                tabIndex="0"
                className="cs-color"
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
  state => ({ modal: state.modals.forgot }),
  dispatch =>
    bindActionCreators({ hide, showSignupModal, ...authActions }, dispatch)
)(ForgotModal);
