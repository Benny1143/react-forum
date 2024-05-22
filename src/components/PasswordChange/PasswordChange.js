import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { changePassword } from 'redux/modules/auth';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';
// import config from '../../config';
import Helmet from 'react-helmet';

class PasswordChange extends Component {
  static propTypes = {
    user: PropTypes.object,
    changePassword: PropTypes.func,
  };

  handleSubmit = values => {
    const { password, newPassword } = values;
    return this.props.changePassword(password, newPassword).then(() => {
      // console.log(res);
      toastr.success('Change Password', 'Your password has been updated.');
      // this.props.hide();
    });
  };

  render() {
    const { user } = this.props; // eslint-disable-line no-shadow
    // const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    if (!user) return <div />;
    return (
      <div className="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <Helmet>
          <title>Change Password</title>
        </Helmet>
        <div className="cs-user-content">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title">
                <h2>Change Password</h2>
              </div>
            </div>
            <PasswordChangeForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const {
      entities: { users },
    } = state;

    const user = state.auth.user && users[state.auth.user];

    return { user };
  },
  { changePassword }
)(PasswordChange);
