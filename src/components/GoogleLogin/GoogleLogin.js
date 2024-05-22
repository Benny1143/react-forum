import PropTypes from 'prop-types';
import React, { Component } from 'react';

class GoogleLogin extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    text: PropTypes.string,
    scope: PropTypes.string,
    className: PropTypes.string,
    redirectUri: PropTypes.string,
    cookiePolicy: PropTypes.string,
    loginHint: PropTypes.string,
    hostedDomain: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    disabledStyle: PropTypes.object,
    fetchBasicProfile: PropTypes.bool,
    prompt: PropTypes.string,
    tag: PropTypes.string,
    autoLoad: PropTypes.bool,
    disabled: PropTypes.bool,
    discoveryDocs: PropTypes.array,
    responseType: PropTypes.string,
    uxMode: PropTypes.string,
    isSignedIn: PropTypes.bool,
  };

  static defaultProps = {
    tag: 'button',
    text: 'Login with Google',
    scope: 'profile email https://www.googleapis.com/auth/plus.me',
    responseType: 'permission',
    prompt: '',
    cookiePolicy: 'single_host_origin',
    fetchBasicProfile: true,
    isSignedIn: false,
    uxMode: 'popup',
    disabledStyle: {
      opacity: 0.6,
    },
    onRequest: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }

  componentDidMount() {
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      autoLoad,
      isSignedIn,
      fetchBasicProfile,
      redirectUri,
      discoveryDocs,
      onFailure,
      uxMode,
    } = this.props;
    /* eslint-disable id-length */
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/api:client.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
      };
      window.gapi.load('auth2', () => {
        this.setState({
          disabled: false,
        });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            res => {
              if (isSignedIn && res.isSignedIn.get()) {
                this.handleSigninSuccess(res.currentUser.get());
              }
            },
            err => onFailure(err)
          );
        }
        if (autoLoad) {
          this.signIn();
        }
      });
    });
    /* eslint-enable id-length */
  }

  signIn = event => {
    if (event) {
      event.preventDefault(); // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const {
        redirectUri,
        onSuccess,
        onRequest,
        fetchBasicProfile,
        onFailure,
        prompt,
        scope,
        responseType,
      } = this.props;
      const options = {
        response_type: responseType,
        redirect_uri: redirectUri,
        fetch_basic_profile: fetchBasicProfile,
        prompt,
        scope,
      };
      onRequest();
      if (responseType === 'code') {
        auth2
          .grantOfflineAccess(options)
          .then(res => onSuccess(res), err => onFailure(err));
      } else {
        auth2
          .signIn(options)
          .then(res => this.handleSigninSuccess(res), err => onFailure(err));
      }
    }
  };

  handleSigninSuccess = res => {
    window.gapi.client.load('plus', 'v1', () => {
      window.gapi.client.plus.people.get({ userId: 'me' }).then(res2 => {
        /*
          offer renamed response keys to names that match use
        */
        const basicProfile = res.getBasicProfile();
        const authResponse = res.getAuthResponse();
        res.googleId = basicProfile.getId();
        res.token = authResponse;
        res.tokenId = authResponse.id_token;
        res.accessToken = authResponse.access_token;
        res.profile = {
          googleId: basicProfile.getId(),
          imageUrl: basicProfile.getImageUrl(),
          email: basicProfile.getEmail(),
          name: basicProfile.getName(),
          givenName: basicProfile.getGivenName(),
          familyName: basicProfile.getFamilyName(),
          url: res2.result.url,
          gender: res2.result.gender,
        };
        this.props.onSuccess(res);
      });
    });
  };

  render() {
    return (
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={this.signIn} data-original-title="google-plus">
          <i className="icon-google2" />
          {this.props.text}
        </a>
      </div>
    );
  }
}

export default GoogleLogin;
