import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { NavLink } from 'react-router-dom';
import Menu from 'react-burger-menu/lib/menus/slide';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';
import { logout } from 'redux/modules/auth';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { show as showLoginModal } from 'redux/modules/modals/login';
import { mapEntityToKeyword } from 'utils/config';
import SignupModal from '../SignupModal/SignupModal';
import LoginModal from '../LoginModal/LoginModal';
import ForgotModal from '../ForgotModal/ForgotModal';
import NavItem from '../NavItem/NavItem';
import styles from './Header.module.scss';

import imgFacebook from '../../assets/img/facebook.svg';
import imgInstagram from '../../assets/img/instagram.svg';

const MobileLinkFactory = menu => props => (
  <NavLink
    {...props}
    exact
    activeClassName={menu.props.styles.activeLink}
    onClick={() => {
      menu.closeMenu();
    }}
  />
);

class MobileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { user, styles, handleShowSignupModal } = this.props;
    const MobileLink = MobileLinkFactory(this);
    return (
      <Menu
        width={200}
        className={styles.mobileMenu}
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <MobileLink className="menu-item" to="/">
          Home
        </MobileLink>
        <MobileLink className="menu-item" to="/about">
          About Us
        </MobileLink>
        <MobileLink className="menu-item" to="/why-share">
          Why Share?
        </MobileLink>
        {user && (
          <MobileLink
            className="menu-item"
            to={`/${mapEntityToKeyword('resources')}/add`}
          >
            Contribute Resource
          </MobileLink>
        )}
        {!user && (
          /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
          <a className="menu-item" tabIndex="0" onClick={handleShowSignupModal}>
            Contribute Resource
          </a>
        )}
        <MobileLink className="menu-item" to="/our-programmes">
          Our Programmes
        </MobileLink>
        <MobileLink className="menu-item" to="/get-involved">
          Get Involved
        </MobileLink>
        <MobileLink className="menu-item" to="/donate">
          Donate
        </MobileLink>
        <MobileLink className="menu-item" to="/contact">
          Contact Us
        </MobileLink>
        <MobileLink className="menu-item" to="/faq">
          FAQ
        </MobileLink>
        <MobileLink className="menu-item" to="/useful-links">
          Useful Links
        </MobileLink>
        <li className="menu-item">
          <a
            href="https://blog.smartguppy.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </li>
        <li className="menu-item">
          <a
            href="https://www.facebook.com/smartguppysg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imgFacebook} alt="SmartGuppy Facebook Page" />
          </a>
          <a
            href="https://www.instagram.com/smartguppy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={imgInstagram} alt="SmartGuppy Instagram Page" />
          </a>
        </li>
      </Menu>
    );
  }
}

class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    showSignupModal: PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired,
  };

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
    toastr.success('Successful Logout', 'You have been logged out.');
  };

  handleShowSignupModal = event => {
    event.preventDefault();
    this.props.showSignupModal();
  };

  handleShowLoginModal = event => {
    event.preventDefault();
    this.props.showLoginModal();
  };

  render() {
    const { user } = this.props; // eslint-disable-line no-shadow
    return (
      <header id="header">
        <LoadingBar className={styles.loadingBar} />
        <MobileMenu
          user={user}
          styles={styles}
          handleShowSignupModal={this.handleShowSignupModal}
        />
        <div className="top-bar">
          <div className="container">
            <div className="row">
              {/*
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <ul className="top-nav nav-left">
                    <li><a tabIndex="0">Students</a></li>
                    <li><a tabIndex="0">Faculty &amp; Staff</a></li>
                    <li><a tabIndex="0">Parents</a></li>
                    <li><a tabIndex="0">Alumni</a></li>
                  </ul>
                  <span className="top-nav nav-left">
                    <img className="logo" alt="Smartguppy" src={require('../../theme/images/logo.png')} />
                  </span>
                </div>
              */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-logo cs-logo-dark">
                  <div className="cs-media">
                    <figure>
                      <NavLink exact to="/">
                        <img
                          className="logo"
                          alt="Smartguppy"
                          src={require('../../theme/images/logo.png')}
                        />
                      </NavLink>
                    </figure>
                  </div>
                </div>
                <div className="cs-user">
                  <ul>
                    <li className="hidden-xs hidden-sm">
                      <div className="cs-user-login">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a tabIndex="0">About Us</a>
                        <ul>
                          <NavItem to="/our-programmes">Our Programmes</NavItem>
                          <NavItem to="/about">About Us</NavItem>
                        </ul>
                      </div>
                    </li>
                    <NavItem to="/why-share" className="hidden-xs hidden-sm">
                      Why Share?
                    </NavItem>
                    <li className="hidden-xs hidden-sm">
                      <div className="cs-user-login">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a tabIndex="0">Contribute</a>
                        <ul>
                          {user && (
                            <li>
                              <NavLink
                                to={`/${mapEntityToKeyword('resources')}/add`}
                              >
                                Share Resource
                              </NavLink>
                            </li>
                          )}
                          {!user && (
                            <li>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a
                                tabIndex="0"
                                onClick={this.handleShowSignupModal}
                              >
                                Share Resource
                              </a>
                            </li>
                          )}
                          <NavItem to="/donate">Donate</NavItem>
                          <NavItem to="/get-involved">Get Involved</NavItem>
                        </ul>
                      </div>
                    </li>
                    {!user && (
                      <li className="hidden-xs">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a tabIndex="0" onClick={this.handleShowLoginModal}>
                          Login / Register
                        </a>
                      </li>
                    )}
                    {!user && (
                      <li className="visible-xs">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a tabIndex="0" onClick={this.handleShowLoginModal}>
                          Login
                        </a>
                      </li>
                    )}
                    <NavItem to="/forum" className="hidden-xs hidden-sm">
                      Forum
                    </NavItem>
                    {user && (
                      <li>
                        <div className="cs-user-login">
                          <div className="cs-media">
                            <figure>
                              <img
                                src={
                                  user.avatar ||
                                  require('assets/img/avatar.png')
                                }
                                alt={user.name}
                              />
                            </figure>
                          </div>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a tabIndex="0">&nbsp;{user.name}</a>
                          <ul>
                            <NavItem to="/profile">
                              <i className="icon-user3 cs-color" />
                              About me
                            </NavItem>
                            <NavItem to="/uploads">
                              <i className="icon-graduation-cap cs-color" />
                              My Uploads
                            </NavItem>
                            <NavItem to="/followers">
                              <i className="icon-heart-o cs-color" />
                              My Followers
                            </NavItem>
                            {/* user && isTuteeUser(user) &&
                              <li><a href="user-short-listed.html"><i className="icon-heart2 cs-color"></i>Favorites</a></li>
                            */}
                            {/*
                              <li><a href="user-statements.html"><i className="icon-file-text2 cs-color"></i>Statement</a></li>
                            */}
                            <NavItem to="/password/change">
                              <i className="icon-lock cs-color" />
                              Change Password
                            </NavItem>
                            <NavItem to="/settings">
                              <i className="icon-gear cs-color" />
                              Edit Profile/Settings
                            </NavItem>
                            <li>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a onClick={this.handleLogout}>
                                <i className="icon-log-out" />
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="cs-modal">
                  <SignupModal />
                  <LoginModal />
                  <ForgotModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
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
  dispatch =>
    bindActionCreators({ logout, showSignupModal, showLoginModal }, dispatch)
)(Header);
