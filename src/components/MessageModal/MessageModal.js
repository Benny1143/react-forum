import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';
import { message as messageUser } from 'redux/modules/users';
import { hide } from 'redux/modules/modals/message';
import MessageForm from '../MessageForm/MessageForm';

class MessageModal extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    resourceId: PropTypes.string,
    modal: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired,
    messageUser: PropTypes.func.isRequired,
  };

  handleHide = () => {
    this.props.hide();
    if (this.props.modal.cancel) this.props.modal.cancel();
  };

  handleSubmit = values => {
    const { message } = values;
    const { userId, resourceId } = this.props;
    return this.props
      .messageUser({ id: userId, resource: resourceId, message })
      .then(() => {
        this.props.hide();
        toastr.success('Successful Message', 'Your message has been sent out.');
      });
  };

  render() {
    const { modal } = this.props;
    return (
      <div>
        <Modal show={modal.visible} onHide={this.handleHide} container={this}>
          <Modal.Header closeButton />
          <Modal.Body>
            <h4>Contact Form</h4>
            <MessageForm onSubmit={this.handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({ modal: state.modals.message }),
  dispatch => bindActionCreators({ hide, messageUser }, dispatch)
)(MessageModal);
