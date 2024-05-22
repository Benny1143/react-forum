import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { push } from 'connected-react-router';
// import Helmet from 'react-helmet';
import cx from 'classnames';
import PropTypes from 'prop-types';
import qs from 'query-string';
import Slider from 'react-slick';
import Partners from '../Partners/Partners';
import NavItem from '../NavItem/NavItem';
// import config from '../../config';
import { preview as previewResources } from 'redux/modules/resources';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { mapEntityToKeyword, mapValueToName } from 'utils/config';
import styles from './Home.module.scss';

const imgBackground = require('assets/img/home_background.jpg');
// const icons = ['icon-progress-one', 'icon-progress-two', 'icon-progress-full'];
const titles = ['Primary School', 'Secondary School', 'Junior College'];
const mainLevels = ['primary', 'secondary', 'junior-college'];
const imgTAA = require('assets/img/home_TAA.jpg');
const imgRocketGuppy = require('assets/img/home_rocket_guppy.jpeg');

class Home extends Component {
  static propTypes = {
    config: PropTypes.object,
    configByValue: PropTypes.object,
    user: PropTypes.object,
    users: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    previewsByMainLevel: PropTypes.object.isRequired,
    showSignupModal: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    this.props.previewResources({ mainLevel: 'primary' });
    this.props.previewResources({ mainLevel: 'secondary' });
    this.props.previewResources({ mainLevel: 'junior-college' });
  }

  handleFormSearch = event => {
    event.preventDefault();

    const { search } = this.state;

    this.props.pushState({
      pathname: `/${mapEntityToKeyword('resources')}/list`,
      search: `?${qs.stringify({ search: JSON.stringify(search) })}`,
    });
  };

  handleShowSignupModal = event => {
    event.preventDefault();
    this.props.showSignupModal();
  };

  render() {
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    // const { config: { levels, subjects }, users, resources } = this.props;
    const {
      configByValue = {},
      user,
      users,
      resources,
      previewsByMainLevel,
    } = this.props;
    const {
      /* mainLevels = undefined, */ subjects = undefined,
      levels = undefined,
    } = configByValue;
    const previewsList = [
      previewsByMainLevel.primary,
      previewsByMainLevel.secondary,
      previewsByMainLevel['junior-college'],
    ];

    return (
      <div className={styles.home}>
        <div
          className={cx('page-section', styles.banner)}
          style={{ backgroundImage: `url(${imgBackground})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-column-text">
                  {/*
                    <span style={{ display: 'inline-block', padding: '10px 20px', background: 'rgba(0,0,0,0.8)', color: '#FFF', fontSize: '18px', marginBottom: '22px' }}>What would you like to learn?</span>
                    <h1 style={{ color: '#ffffff !important', lineHeight: '64px !important', textTransform: 'capitalize !important' }}>Brighton Experience</h1>
                  */}
                  <h1 className={styles.tagline}>Empower Yourself</h1>
                  <h2 className={styles.subtag}>
                    FREE quality notes, worksheets & exam papers from passionate
                    sharers!
                  </h2>
                  <form onSubmit={this.handleFormSearch}>
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="text"
                        className={styles.inputBox}
                        placeholder="Search Resources"
                        value={this.state.search}
                        onChange={event => {
                          this.setState({ search: event.target.value });
                        }}
                      />
                      <button
                        type="submit"
                        className={cx('cs-bgcolor', styles.searchBtn)}
                      >
                        <i className="icon-search3" />
                      </button>
                    </div>
                    {/*
                      <div className="call-actions cs-bgcolor">
                        <div className="cell icon">
                          <i className="icon-mood"></i>
                        </div>
                        <div className="cell heading">
                          <h5>Help us with our fund-raising</h5>
                          <p>We aim to empower underprivileged students and help them succeed!</p>
                        </div>
                        <div className="cell cell-btn">
                          <a
                            href="https://give.asia/smartguppy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="information-btn"
                          >Donate Now</a>
                        </div>
                      </div>
                    */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-section">
          <div className="page-section" style={{ marginTop: '-60px' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <ul className="cs-top-categories">
                    {user && (
                      <NavItem to={`/${mapEntityToKeyword('resources')}/add`}>
                        <div>
                          <img
                            src={require('./share.svg')}
                            alt="I am here to share"
                          />
                        </div>
                        I am here to share
                      </NavItem>
                    )}
                    {!user && (
                      <li>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a tabIndex="0" onClick={this.handleShowSignupModal}>
                          <div>
                            <img
                              src={require('./share.svg')}
                              alt="I am here to share"
                            />
                          </div>
                          I am here to share
                        </a>
                      </li>
                    )}
                    <NavItem to={`/${mapEntityToKeyword('resources')}`}>
                      <div>
                        <img
                          src={require('./learn.svg')}
                          alt="I am here to learn"
                        />
                      </div>
                      I am here to learn
                    </NavItem>
                    {/* mainLevels &&
                      Object.values(mainLevels).slice(0, 3).map(mainLevel => (
                        <NavItem
                          to={`/${mapEntityToKeyword('resources')}/${
                            mainLevel.value
                          }`}
                          key={mainLevel.value}
                        >
                          <div>
                            <img
                              src={require(`./resources-${
                                mainLevel.value
                              }.png`)}
                              alt={mainLevel.name}
                            />
                          </div>
                          {`${mainLevel.name} resources`}
                        </NavItem>
                      )) */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '20px' }} className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div
                  style={{ marginBottom: '40px' }}
                  className="cs-section-title center"
                >
                  <h2 className="cs-color">HOW WE LIKE TO HELP YOU</h2>
                  <p className={styles.intro}>
                    In this difficult period, we rely, more than ever, on each other's help and kindness.
                    SmartGuppy stands ready to help as many students as possible, especially those who do not have the means to acquire good educational materials. 
                    We believe in the inspirational power of a sharing community where everyone has something to contribute and everyone benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Partners />
        <div
          className="page-section"
          style={{ background: '#f9fafa', paddingTop: '32px' }}
        >
          <div className="container">
            {previewsList.map((previews, index) => (
              <div className="row" key={index}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-section-title left">
                    <h2>
                      {titles[index]} resources
                      <NavLink
                        to={`/${mapEntityToKeyword('resources')}/${
                          mainLevels[index]
                        }`}
                        className={cx('pull-right', styles.viewAll)}
                      >
                        View All
                      </NavLink>
                    </h2>
                  </div>
                </div>
                <div className="page-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <Slider
                      dots
                      arrows={false}
                      autoplay
                      draggable={false}
                      slidesToShow={4}
                      slidesToScroll={4}
                      responsive={[
                        {
                          breakpoint: 479,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                          },
                        },
                        {
                          breakpoint: 767,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                          },
                        },
                        {
                          breakpoint: 1023,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                          },
                        },
                        {
                          breakpoint: 100000,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                          },
                        },
                      ]}
                    >
                      {previews &&
                        previews.map(preview => {
                          const resource = resources[preview._id];
                          const author =
                            resource &&
                            resource.author &&
                            users &&
                            users[resource.author];
                          return (
                            <div key={resource._id}>
                              <div
                                className="cs-courses courses-grid"
                                style={{ margin: '0 10px' }}
                              >
                                <div className="cs-media">
                                  <figure>
                                    <Link
                                      to={`/${mapEntityToKeyword('resource')}/${
                                        resource.subject
                                      }/${resource.slug}`}
                                    >
                                      <div
                                        style={{
                                          backgroundImage: `url(${resource.avatar ||
                                            require('assets/img/resource.png')})`,
                                        }}
                                      />
                                    </Link>
                                  </figure>
                                </div>
                                <div className="cs-text">
                                  {/*
                                      <div className="cs-rating">
                                        <div className="cs-rating-star">
                                          <span className="rating-box" style={{ width: '100%' }}></span>
                                        </div>
                                      </div>
                                    */}
                                  <span className="cs-caption">
                                    {mapValueToName(subjects, resource.subject)}
                                  </span>
                                  {resource.levels.map(level => (
                                    <span className="cs-caption" key={level}>
                                      {mapValueToName(levels, level)}
                                    </span>
                                  ))}
                                  <div className="cs-post-title">
                                    <h5>
                                      <Link
                                        to={`/${mapEntityToKeyword(
                                          'resource'
                                        )}/${resource.subject}/${
                                          resource.slug
                                        }`}
                                      >
                                        {resource.name}
                                      </Link>
                                    </h5>
                                    <div>
                                      <i className="icon-download" />
                                      {` ${resource.nDownloads} Downloads`}
                                    </div>
                                  </div>
                                  <div className="cs-post-meta">
                                    <span>
                                      By&nbsp;
                                      <Link
                                        to={`/users/${author && author._id}`}
                                        className="cs-color"
                                      >
                                        {author && author.name}
                                      </Link>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </Slider>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="page-section" style={{ margin: '30px 0' }}>
          <div className="container">
            <div className={styles.partner}>
              Our Partners in our Cause<br/>for Educational Equality
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className={styles.partnerImg}>
                  <img src={imgRocketGuppy} alt="rocket guppy"/>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                SmartGuppy is proud to partner with Temporary Academic Assistance (TAA) to continue helping students even beyond COVID-19.
                We both share the same belief that education is a long lasting endeavour and SmartGuppy aims to
                continue the good work of TAA by helping as many underprivileged students find the right tutor for the long term.<br/><br/>
                We invite you to join our community of teachers and students, sharing educational resources freely and tutoring students for free as well!<br/><br/>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className={styles.partnerImg}>
                  <img src={imgTAA} alt="TAA"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="cs-section-title center">
            <p style={{ fontSize: '30px', fontFamily: 'Caveat' }}>
              Join the Community now!
            </p>
            <strong>
              <Link className={styles.button} to="/contact">
                Volunteer
              </Link>
            </strong>
            <strong>
              {user && (
                <Link className={styles.button} to={`/${mapEntityToKeyword('resources')}/add`}>
                  Share
                </Link>
              )}
              {!user && (
                <a className={styles.button} href="Contribute now" onClick={this.handleShowSignupModal}>
                  Share
                </a>
              )}
            </strong>
          </div>
        </div>
        <div className="page-section" style={{ background: '#f9fafa' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-column-text">
                  <div
                    className="call-actions cs-bgcolor"
                    style={{ marginBottom: '20px' }}
                  >
                    <div className="cell icon">
                      <i className="icon-mood" />
                    </div>
                    <div className="cell heading">
                      <h5>Help us with our fund-raising</h5>
                      <p>
                        We aim to empower underprivileged students and help them
                        succeed!
                      </p>
                    </div>
                    <div className="cell cell-btn">
                      <NavLink to="/donate" className="information-btn">
                        Donate Now
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const {
      entities: { users, resources },
      resources: { previewsByMainLevel },
    } = state;

    const user = state.auth.user && users[state.auth.user];

    return {
      config: state.config && state.config.data,
      configByValue: state.config && state.config.dataByValue,
      user,
      users,
      resources,
      previewsByMainLevel,
    };
  },
  { pushState: push, previewResources, showSignupModal }
)(Home);
