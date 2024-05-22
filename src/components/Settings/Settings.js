import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { update as updateUser } from 'redux/modules/users';
import SettingsForm from '../SettingsForm/SettingsForm';
// import config from '../../config';
import Helmet from 'react-helmet';

class Settings extends Component {
  static propTypes = {
    config: PropTypes.object,
    user: PropTypes.object,
    updateUser: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    const {
      user: { _id },
    } = this.props;
    const { email, ...rest } = values;
    return this.props.updateUser({ _id, ...rest }).then(() => {
      // console.log(res);
      toastr.success('Settings', 'Your settings have been updated.');
      // this.props.hide();
    });
  };

  render() {
    const {
      config: {
        mainLevels,
        subjects,
        levels,
        genders,
        qualifications,
        basis,
        tutorStatuses,
        schools,
      },
      user,
    } = this.props; // eslint-disable-line no-shadow
    // const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    if (!user) return <div />;

    return (
      <div className="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <Helmet>
          <title>Settings</title>
        </Helmet>
        <div className="cs-user-content">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title">
                <h2>Settings</h2>
                <p>Required fields are marked with asterisks(*).</p>
              </div>
            </div>
            <SettingsForm
              user={user}
              mainLevels={mainLevels}
              subjects={subjects}
              levels={levels}
              genders={genders}
              qualifications={qualifications}
              basis={basis}
              tutorStatuses={tutorStatuses}
              schools={schools}
              onSubmit={this.handleSubmit}
            />
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

    const config = state.config.dataByValue;
    const user = state.auth.user && users[state.auth.user];

    return { config, user };
  },
  { updateUser }
)(Settings);
