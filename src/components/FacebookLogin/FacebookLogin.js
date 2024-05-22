import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FacebookLogin extends Component {
  static propTypes = {
    scope: PropTypes.string,
    onResponse: PropTypes.func,
    fields: PropTypes.string,
    text: PropTypes.string,
  };

  static defaultProps = {
    scope: 'public_profile,email',
  };

  getProfile = (authResponse, callback) => {
    if (typeof window !== undefined && window && window.FB) {
      const { fields } = this.props;
      window.FB.api('/me', { fields }, profile => {
        return callback(profile);
      });
    }
  };

  checkLoginState = ({ authResponse, status }) => {
    const { onResponse } = this.props;
    if (authResponse) {
      this.getProfile(authResponse, profile => {
        if (onResponse) {
          onResponse({ profile, status, authResponse });
        }
      });
    } else {
      if (onResponse) {
        onResponse({ status });
      }
    }
  };

  handleClick = () => {
    const { scope } = this.props;
    if (typeof window !== undefined && window && window.FB) {
      window.FB.login(this.checkLoginState, { scope });
    }
  };

  render() {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={this.handleClick} data-original-title="facebook">
          <i className="icon-facebook-official" />
          {this.props.text}
        </a>
      </div>
    );
  }
}

export default FacebookLogin;
