import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { replace } from 'connected-react-router';
import { toastr } from 'react-redux-toastr';
import cx from 'classnames';
import Profile from '../Profile/Profile';
import Avatar from '../Avatar/Avatar';
import Uploads from '../Uploads/Uploads';
import Followers from '../Followers/Followers';
import PasswordChange from '../PasswordChange/PasswordChange';
import Settings from '../Settings/Settings';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import NavItem from '../NavItem/NavItem';
import MessageModal from '../MessageModal/MessageModal';
// import config from '../../config';
// import Helmet from 'react-helmet';
import { load as loadAuth } from 'redux/modules/auth';
import {
  read as getUser,
  follow as followUser,
  message as messageUser,
} from 'redux/modules/users';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { show as showMessageModal } from 'redux/modules/modals/message';
import { isFollowerOf } from 'utils/user';

class User extends Component {
  static propTypes = {
    config: PropTypes.object,
    url: PropTypes.string,
    auth: PropTypes.object,
    user: PropTypes.object,
    userId: PropTypes.string,
    isOwnProfile: PropTypes.bool.isRequired,
    isFollower: PropTypes.bool,
    social: PropTypes.object,
    pathname: PropTypes.string.isRequired,
    loadAuth: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    followUser: PropTypes.func.isRequired,
    messageUser: PropTypes.func.isRequired,
    showSignupModal: PropTypes.func.isRequired,
    showMessageModal: PropTypes.func.isRequired,
    replaceState: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, userId, isOwnProfile, pathname } = this.props;
    if (isOwnProfile && userId) {
      const array = pathname.split('/');
      const addonPath = array[array.length - 1];
      this.props.replaceState(`/${addonPath}`);
    }
    if (userId && !user) {
      this.props.getUser({ id: userId });
    }
  }

  handleClickFollow = () => {
    const { userId } = this.props;
    this.props.followUser({ id: userId }).then(() => {
      this.props.loadAuth();
    });
  };

  handleSubmitMessage = values => {
    const { message } = values;
    const { userId } = this.props;
    this.props.messageUser({ id: userId, message }).then(() => {
      toastr.success('Successful Message', 'Your message has been sent.');
    });
  };

  handleShowSignupModal = event => {
    event.preventDefault();
    this.props.showSignupModal();
  };

  handleShowMessageModal = event => {
    event.preventDefault();
    this.props.showMessageModal();
  };

  render() {
    const styles = require('./User.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    const {
      config,
      url,
      auth,
      user,
      isOwnProfile,
      isFollower,
    } = this.props;

    const passedProps = {
      config,
      auth,
      user,
      isOwnProfile,
      isFollower,
      showSignupModal: this.props.showSignupModal,
      handleClickFollow: this.handleClickFollow,
    };

    if (!user) return <div />;

    return (
      <div
        className={cx(
          'main-section',
          isOwnProfile ? '' : 'cs-team-detail',
          styles.user
        )}
      >
        <div className="page-section">
          <div className="container">
            <div className="row">
              {isOwnProfile && (
                <div className="page-sidebar col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <div className="cs-user-sidebar">
                    <div className="cs-profile-pic">
                      <div className="profile-pic">
                        <div className="cs-media">
                          <figure>
                            <img
                              src={
                                user.avatar || require('assets/img/avatar.png')
                              }
                              alt={user.name}
                            />
                          </figure>
                        </div>
                      </div>
                      <div className="cs-browse-holder">
                        <em>
                          <i className="icon-uniF11E cs-color" />{' '}
                          {user.followers.length} follower
                          {user.followers.length === 1 ? '' : 's'}
                        </em>
                        {isOwnProfile && (
                          <Link to="/avatar">
                            <span className="file-input btn-file">
                              {' '}
                              Update Picture
                            </span>
                          </Link>
                        )}
                        {!isOwnProfile && !isFollower && (
                          /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                          <a onClick={this.handleClickFollow}>
                            <span className="file-input btn-file"> Follow</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="cs-usser-account-list">
                      <ul>
                        {!isOwnProfile && (
                          <NavItem to={`/users/${user._id}/profile`}>
                            <i className="icon-user3 cs-color" />
                            About
                          </NavItem>
                        )}
                        {isOwnProfile && (
                          <NavItem to="/profile">
                            <i className="icon-user3 cs-color" />
                            About me
                          </NavItem>
                        )}
                        {!isOwnProfile && (
                          <NavItem to={`/users/${user._id}/uploads`}>
                            <i className="icon-graduation-cap cs-color" />
                            Resources
                          </NavItem>
                        )}
                        {isOwnProfile && (
                          <NavItem to="/uploads">
                            <i className="icon-graduation-cap cs-color" />
                            My Uploads
                          </NavItem>
                        )}
                        {!isOwnProfile && (
                          <NavItem to={`/users/${user._id}/followers`}>
                            <i className="icon-heart-o cs-color" />
                            Followers
                          </NavItem>
                        )}
                        {isOwnProfile && (
                          <NavItem to="/followers">
                            <i className="icon-heart-o cs-color" />
                            My Followers
                          </NavItem>
                        )}
                        {/* user && isTuteeUser(user) &&
                          <li><a href="user-short-listed.html"><i className="icon-heart2 cs-color"></i>Favorites</a></li>
                        */}
                        {/*
                          <li><a href="user-statements.html"><i className="icon-file-text2 cs-color"></i>Statement</a></li>
                        */}
                        {isOwnProfile && (
                          <NavItem to="/password/change">
                            <i className="icon-lock cs-color" />
                            Change Password
                          </NavItem>
                        )}
                        {isOwnProfile && (
                          <NavItem to="/settings">
                            <i className="icon-gear cs-color" />
                            Edit Profile / Settings
                          </NavItem>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              {!isOwnProfile && (
                <aside className="section-sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <div className="cs-media">
                    <figure>
                      <img
                        src={user.avatar || require('assets/img/avatar.png')}
                        alt={user.name}
                      />
                    </figure>
                  </div>
                  <div
                    className="widget cs-widget-links"
                    style={{ marginTop: '30px' }}
                  >
                    <ul>
                      <NavItem to={`/users/${user._id}/profile`}>About</NavItem>
                      <NavItem to={`/users/${user._id}/uploads`}>
                        Uploaded Resources
                      </NavItem>
                      <NavItem to={`/users/${user._id}/followers`}>
                        Followers
                      </NavItem>
                    </ul>
                    {auth && (
                      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                      <a
                        onClick={this.handleShowMessageModal}
                        className="cs-button has-icon cs-bgcolor cs-greencolor"
                      >
                        <i className="icon-chat" />
                        &nbsp;Contact Me
                      </a>
                    )}
                    {!auth && (
                      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                      <a
                        onClick={this.handleShowSignupModal}
                        className="cs-button has-icon cs-bgcolor cs-greencolor"
                      >
                        <i className="icon-chat" />
                        &nbsp;Contact Me
                      </a>
                    )}
                  </div>
                  {/* auth &&
                    <div className="cs-detail-form">
                      <h6>Contact Me</h6>
                      <UserContactForm onSubmit={this.handleSubmitMessage} />
                    </div>
                  */}
                </aside>
              )}

              <Switch>
                <PrivateRoute
                  path="/profile"
                  render={props => <Profile {...passedProps} {...props} />}
                />
                <PrivateRoute path="/avatar" component={Avatar} />
                <PrivateRoute
                  path="/uploads"
                  render={props => <Uploads {...passedProps} {...props} />}
                />
                <PrivateRoute
                  path="/followers"
                  render={props => <Followers {...passedProps} {...props} />}
                />
                <PrivateRoute
                  path="/password/change"
                  component={PasswordChange}
                />
                <PrivateRoute path="/settings" component={Settings} />

                <Route
                  path={`${url}/profile`}
                  render={props => <Profile {...passedProps} {...props} />}
                />
                <Route
                  path={`${url}/uploads`}
                  render={props => <Uploads {...passedProps} {...props} />}
                />
                <Route
                  path={`${url}/followers`}
                  render={props => <Followers {...passedProps} {...props} />}
                />
                <Redirect to={`${url}/profile`} />
              </Switch>
            </div>
          </div>
        </div>
        <div className="cs-modal">
          <MessageModal userId={user._id} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {
      entities: { users },
    } = state;
    const {
      location: { pathname },
      match: {
        params: { userId },
        url,
      },
    } = ownProps;

    const config = state.config && state.config.dataByValue;
    const auth = state.auth.user && users && users[state.auth.user];
    const user = userId
      ? users[userId]
      : state.auth.user && users[state.auth.user];
    const isOwnProfile = userId ? userId === state.auth.user : true;
    const isFollower =
      user &&
      state.auth.user &&
      users[state.auth.user] &&
      isFollowerOf(user, state.auth.user && users[state.auth.user]);

    return {
      config,
      url,
      auth,
      user,
      userId,
      isOwnProfile,
      isFollower,
      pathname,
    };
  },
  {
    loadAuth,
    getUser,
    followUser,
    messageUser,
    showSignupModal,
    showMessageModal,
    replaceState: replace,
  }
)(User);
