import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import qs from 'query-string';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { show as showLoginModal } from 'redux/modules/modals/login';
import NavItem from '../NavItem/NavItem';
import { mapEntityToKeyword } from 'utils/config';
import styles from './Footer.module.scss';

class Footer extends PureComponent {
  static propTypes = {
    primarySchools: PropTypes.array,
    secondarySchools: PropTypes.array,
    juniorCollegeSchools: PropTypes.array,
    showSignupModal: PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired,
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
    const { primarySchools, secondarySchools, juniorCollegeSchools } = this.props;

    return (
      <footer id="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-footer-logo-holder center">
                <div className="cs-footer-nav">
                  <div className="cs-logo">
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
                  <div className="footer-nav">
                    <ul>
                      <NavItem to="/about">About Us</NavItem>
                      {/*
                        <li><a tabIndex="0">Careers</a></li>
                      */}
                      <li>
                        <a
                          href="https://blog.smartguppy.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Blog
                        </a>
                      </li>
                      {/*
                        <li><a tabIndex="0">Affiliate Program</a></li>
                      */}
                      <NavItem to="/donate">Donate</NavItem>
                      <NavItem to="/terms-of-use">Terms of Use</NavItem>
                      <NavItem to="/privacy-policy">Privacy Policy</NavItem>
                      <NavItem to="/useful-links">Useful Links</NavItem>
                      <NavItem to="/faq">FAQ</NavItem>
                      <NavItem to="/our-programmes">Our Programmes</NavItem>
                      {/*
                        <li><a tabIndex="0">Press Kit</a></li>
                      */}
                      <NavItem to="/why-share">Why Share?</NavItem>
                      <NavItem to="/get-involved">Get Involved</NavItem>
                      <NavItem to="/contact">Contact Us</NavItem>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs-copyright">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="copyright-text">
                  <p>
                    © {new Date().getFullYear()} SmartGuppy. All Rights
                    Reserved.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="cs-social-media">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/smartguppysg/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-facebook2" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/SmartGuppy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-twitter2" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/smartguppy/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-instagram2" />
                      </a>
                    </li>
                    {/*
                      <li><a tabIndex="0"><i className="icon-youtube3"></i></a></li>
                      <li><a tabIndex="0"><i className="icon-linkedin22"></i></a></li>
                    */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container hidden-xs">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-footer-nav">
                <div className="footer-nav">
                  <hr />
                  <div className={styles.title}>Primary Schools</div>
                  <div className={styles.col4}>
                    <ul>
                      {primarySchools.map(school => (
                        <NavItem to={`/${mapEntityToKeyword('resources')}/primary?${qs.stringify({ search: JSON.stringify(school.name) })}`} key={school.value}>
                          {school.name}
                        </NavItem>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className={styles.title}>Secondary Schools</div>
                  <div className={styles.col4}>
                    <ul>
                      {secondarySchools.map(school => (
                        <NavItem to={`/${mapEntityToKeyword('resources')}/secondary?${qs.stringify({ search: JSON.stringify(school.name) })}`} key={school.value}>
                          {school.name}
                        </NavItem>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className={styles.title}>Junior Colleges</div>
                  <div className={styles.col4}>
                    <ul>
                      {juniorCollegeSchools.map(school => (
                        <NavItem to={`/${mapEntityToKeyword('resources')}/junior-college?${qs.stringify({ search: JSON.stringify(school.name) })}`} key={school.value}>
                          {school.name}
                        </NavItem>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(
  state => {
    const config = state.config.dataByValue;

    const primarySchools =
      (config &&
        config.schools &&
        Object.values(config.schools)
          .filter(school => school.featured && school.mainLevels.indexOf('primary') > -1)
          .sort((first, second) => first.name.localeCompare(second.name))) ||
      [];
    const secondarySchools =
      (config &&
        config.schools &&
        Object.values(config.schools)
          .filter(school => school.featured && school.mainLevels.indexOf('secondary') > -1)
          .sort((first, second) => first.name.localeCompare(second.name))) ||
      [];
    const juniorCollegeSchools =
      (config &&
        config.schools &&
        Object.values(config.schools)
          .filter(school => school.featured && school.mainLevels.indexOf('junior-college') > -1)
          .sort((first, second) => first.name.localeCompare(second.name))) ||
      [];

    return { primarySchools, secondarySchools, juniorCollegeSchools };
  },
  dispatch => bindActionCreators({ showSignupModal, showLoginModal }, dispatch)
)(Footer);
