import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { toastr } from 'react-redux-toastr';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { show as showLoginModal } from 'redux/modules/modals/login';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { show as showMessageModal } from 'redux/modules/modals/message';
import {
  read as readResource,
  remove as removeResource,
  download as downloadResource,
  preview as previewResources,
} from 'redux/modules/resources';
import {
  list as listReviews,
  create as createReview,
} from 'redux/modules/reviews';
import ReviewsAddForm from '../ReviewsAddForm/ReviewsAddForm';
import ShareButton from '../ShareButton/ShareButton';
import MessageModal from '../MessageModal/MessageModal';
import { mapEntityToKeyword, mapValueToName } from 'utils/config';
import { push } from 'connected-react-router';
import dayjs from 'dayjs';
import PreviewSlider from 'components/PreviewSlider/PreviewSlider';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

class ResourcesView extends Component {
  static propTypes = {
    user: PropTypes.object,
    config: PropTypes.object,
    resource: PropTypes.object,
    author: PropTypes.object,
    reviews: PropTypes.array,
    social: PropTypes.object,
    showLoginModal: PropTypes.func.isRequired,
    showSignupModal: PropTypes.func.isRequired,
    showMessageModal: PropTypes.func.isRequired,
    readResource: PropTypes.func.isRequired,
    removeResource: PropTypes.func.isRequired,
    downloadResource: PropTypes.func.isRequired,
    listReviews: PropTypes.func.isRequired,
    createReview: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    previewBySubject: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.previewResources({ subject: this.props.match.params.subject });
    if (!this.props.fetchingResources) {
      this.props.readResource({ id: this.props.resourceSlug }).then(res => {
        const {
          data: { _id },
        } = res;
        this.props.listReviews({ resource: _id });
      });
    }
    // if (!getState().reviews.isFetching) {
    //   promises.push(dispatch(listReviews({ resource: resourceSlug })));
    // }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.resourceSlug !== prevProps.resourceSlug &&
      !this.props.fetchingResources
    ) {
      this.props.readResource({ id: this.props.resourceSlug }).then(res => {
        const {
          data: { _id },
        } = res;
        this.props.listReviews({ resource: _id });
      });
    }
  }

  handleDownload = resource => () => {
    if (typeof window !== undefined) {
      const win = window.open();
      this.props.downloadResource({ _id: resource._id }).then(({ url }) => {
        // console.log(res);
        if (win) {
          win.location.href = url;
          win.focus();
        }
      });
    }
  };

  handleDelete = resource => () => {
    toastr.confirm(
      `Are you sure you would like to delete "${resource.name}"?`,
      {
        onOk: () => {
          this.props.removeResource({ _id: resource._id }).then(() => {
            // console.log(res);
            this.props.pushState('/uploads');
            toastr.success(
              'Successful Deletion',
              `"${resource.name}" has been deleted!`
            );
          });
        },
      }
    );
  };

  handleAddReview = resource => values => {
    const { rating, description } = values;
    return this.props
      .createReview({ rating, description, resource })
      .then(() => {
        // console.log(res);
        // this.props.pushState('/');
        this.props.readResource({ id: resource });
        this.props.listReviews({ resource });
      });
  };

  handleShowLoginModal = event => {
    event.preventDefault();
    this.props.showLoginModal();
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
    const {
      user,
      resource,
      author,
      reviews,
      config: { difficulties, languages, subjects, levels } = {},
      users,
      resources,
      previewBySubject,
    } = this.props;
    // const styles = require('./ResourcesView.scss');
    const previews = previewBySubject[this.props.match.params.subject];

    if (!resource || !author) return <div />;

    return (
      <div className="cs-courses-detail">
        <div className="main-section" style={{ margin: 0 }}>
          <div className="page-section" style={{ background: '#ebebeb', padding: '50px 0 35px' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-page-title">
                    <h1>{resource.name}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-section" style={{ paddingTop: '40px' }}>
            <div className="container">
              <Helmet>
                <title>{resource.name}</title>
              </Helmet>
              <div className="row">
                <aside className="page-sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <div className="widget cs-widget-links">
                    <ul>
                      <li>
                        <ScrollLink to="description" smooth duration={500}>
                          Description
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="author" smooth duration={500}>
                          Author
                        </ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="reviews" smooth duration={500}>
                          Reviews
                        </ScrollLink>
                      </li>
                    </ul>
                    {user && (
                      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                      <a
                        onClick={this.handleDownload(resource)}
                        className="cs-button has-icon cs-bgcolor cs-tomatocolor"
                      >
                        <i className="icon-download" />
                        &nbsp;Download
                      </a>
                    )}
                    {!user && (
                      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                      <a
                        onClick={this.handleShowLoginModal}
                        className="cs-button has-icon cs-bgcolor cs-tomatocolor"
                      >
                        <i className="icon-download" />
                        &nbsp;Download
                      </a>
                    )}
                    {user && author && user._id === author._id && (
                      <Link
                        to={`/${mapEntityToKeyword('resources')}/edit/${
                          resource._id
                        }`}
                        className="cs-button has-icon cs-bgcolor"
                      >
                        <i className="icon-edit" />
                        &nbsp;Edit
                      </Link>
                    )}
                    {user && author && user._id === author._id && (
                      /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                      <a
                        onClick={this.handleDelete(resource)}
                        className="cs-button has-icon cs-bgcolor"
                      >
                        <i className="icon-cross" />
                        &nbsp;Delete
                      </a>
                    )}
                  </div>
                </aside>
                <div className="page-content col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div id="description" className="cs-about-courses">
                        <div className="row">
                          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <div className="cs-author-info">
                              <div className="alignleft">
                                <h3>Description</h3>
                              </div>
                              <div className="alignright">
                                <ShareButton appId={process.env.REACT_APP_FB_APP_ID} />
                              </div>
                            </div>
                            {/* <div className="cs-section-title"><h3>{resource.name}</h3></div> */}
                            <div
                              className="rich_editor_text"
                              dangerouslySetInnerHTML={{
                                __html: resource.description,
                              }}
                            />
                            <div>
                              <b>Need help?&nbsp;</b>
                              {user && (
                                /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                                <a
                                  onClick={this.handleShowMessageModal}
                                  className="cs-btn large cs-bgcolor cs-greencolor"
                                >
                                  Message me for Free
                                </a>
                              )}
                              {!user && (
                                /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                                <a
                                  onClick={this.handleShowSignupModal}
                                  className="cs-btn large cs-bgcolor cs-greencolor"
                                >
                                  Message me for Free :)
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="cs-media">
                              <figure>
                                <img
                                  src={
                                    resource.avatar ||
                                    require('assets/img/resource.png')
                                  }
                                  style={{ width: '100%' }}
                                  alt={resource.name}
                                />
                              </figure>
                            </div>
                            <div className="cs-courses-overview">
                              <ul>
                                <li>
                                  <i className="icon-earth" />
                                  Language:&nbsp;
                                  <span>
                                    {mapValueToName(
                                      languages,
                                      resource.language
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <i className="icon-uniF101" />
                                  Skill Level:&nbsp;
                                  <span>
                                    {mapValueToName(
                                      difficulties,
                                      resource.difficulty
                                    )}
                                  </span>
                                </li>
                                <li>
                                  <i className="icon-price-tags" />
                                  <span className="cs-caption">
                                    {mapValueToName(subjects, resource.subject)}
                                  </span>
                                  {resource.levels.map(level => (
                                    <span className="cs-caption" key={level}>
                                      {mapValueToName(levels, level)}
                                    </span>
                                  ))}
                                </li>
                                <li>
                                  <i className="icon-download" />
                                  Downloads:&nbsp;
                                  <span>{resource.nDownloads}</span>
                                </li>
                              </ul>
                              {/*
                                <div className="cs-review-summary">
                                  <div className="review-average-score">
                                    <em className="cs-color">{resource.rating ? (resource.rating * 5).toFixed(1) : 0}</em>
                                    <span className="cs-overall-rating">Overall Rating</span>
                                    <div className="cs-rating">
                                      <div className="cs-rating-star">
                                        <span className="rating-box" style={{ width: `${resource.rating ? (resource.rating * 100) : 0}%` }}></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="author">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-section-title">
                    <h3>Author</h3>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-team listing">
                    <div className="cs-media">
                      <figure>
                        <Link to={`/users/${author._id}`}>
                          <img
                            src={
                              author.avatar || require('assets/img/avatar.png')
                            }
                            alt={author.name}
                          />
                        </Link>
                      </figure>
                    </div>
                    <div className="cs-text">
                      <h5>
                        <Link to={`/users/${author._id}`} className="cs-color">
                          {author.name}
                        </Link>
                      </h5>
                      <p>{author.description}</p>
                      <div className="cs-social-media">
                        <ul>
                          {author.socialProfiles &&
                            author.socialProfiles.facebook && (
                              <li>
                                <a
                                  data-original-title="facebook"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={author.socialProfiles.facebook}
                                >
                                  <i className="icon-facebook2" />
                                </a>
                              </li>
                            )}
                          {author.socialProfiles &&
                            author.socialProfiles.pinterest && (
                              <li>
                                <a
                                  data-original-title="pinterest"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={author.socialProfiles.pinterest}
                                >
                                  <i className="icon-pinterest3" />
                                </a>
                              </li>
                            )}
                          {author.socialProfiles &&
                            author.socialProfiles.twitter && (
                              <li>
                                <a
                                  data-original-title="twitter"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={author.socialProfiles.twitter}
                                >
                                  <i className="icon-twitter2" />
                                </a>
                              </li>
                            )}
                          {author.socialProfiles &&
                            author.socialProfiles.linkedin && (
                              <li>
                                <a
                                  data-original-title="linkedin"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={author.socialProfiles.linkedin}
                                >
                                  <i className="icon-linkedin22" />
                                </a>
                              </li>
                            )}
                          {author.socialProfiles &&
                            author.socialProfiles.google && (
                              <li>
                                <a
                                  data-original-title="google"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={author.socialProfiles.google}
                                >
                                  <i className="icon-google-plus" />
                                </a>
                              </li>
                            )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reviews" className="cs-reviews">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-section-title">
                    <h3>Reviews</h3>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  {!reviews.length && <p>No reviews yet.</p>}
                  <ul className="cs-review-list">
                    {!!reviews.length &&
                      reviews.map(review => (
                        <li key={review._id}>
                          <div className="cs-media">
                            <figure>
                              <Link
                                to={`/users/${review.author &&
                                  review.author._id}`}
                              >
                                <img
                                  src={
                                    (review.author && review.author.avatar) ||
                                    require('assets/img/avatar.png')
                                  }
                                  alt={review.author && review.author.name}
                                />
                              </Link>
                            </figure>
                          </div>
                          <div className="cs-text">
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span
                                  className="rating-box"
                                  style={{
                                    width: `${review.rating * 100}%`,
                                  }}
                                />
                              </div>
                              <em>{(review.rating * 5).toFixed(1)}</em>
                            </div>
                            <p>{review.description}</p>
                            <h6>
                              <Link
                                to={`/users/${review.author &&
                                  review.author._id}`}
                              >
                                {review.author && review.author.name}
                              </Link>
                            </h6>
                            <span className="cs-post-date">
                              {dayjs(review.createdAt).fromNow()}
                            </span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                {resource.downloaded &&
                  !resource.reviewed &&
                  user &&
                  author &&
                  user._id !== author._id && (
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="cs-section-title">
                        <h3>Add a review </h3>
                      </div>
                      <ReviewsAddForm
                        onSubmit={this.handleAddReview(resource._id)}
                      />
                    </div>
                  )}
              </div>
              <div className="recommendation" style={{ marginTop: '40px' }}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-section-title">
                    <h3>Also recommended for you</h3>
                  </div>
                </div>
                <div style={{ paddingBottom: 35 }}>
                  <PreviewSlider
                    previews={previews}
                    users={users}
                    subjects={subjects}
                    levels={levels}
                    resources={resources}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs-modal">
          <MessageModal userId={author._id} resourceId={resource._id} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {
      entities,
      resources: { slugToId, isFetching, previewBySubject },
    } = state;
    const {
      match: {
        params: { resourceSlug },
      },
    } = ownProps;

    const user =
      state.auth.user && entities.users && entities.users[state.auth.user];
    const config = state.config.dataByValue;
    const resource =
      slugToId[resourceSlug] && entities.resources[slugToId[resourceSlug]];
    const author =
      resource &&
      resource.author &&
      entities.users &&
      entities.users[resource.author];
    const reviews =
      (entities.reviews &&
        state.reviews.ids &&
        state.reviews.ids.map(id => {
          return {
            ...entities.reviews[id],
            author:
              entities.users && entities.users[entities.reviews[id].author],
          };
        })) ||
      [];

    const users = entities.users;
    const resources = entities.resources;

    return {
      user,
      config,
      resource,
      author,
      reviews,
      fetchingResources: isFetching,
      resourceSlug,
      users,
      resources,
      previewBySubject,
    };
  },
  {
    showLoginModal,
    showSignupModal,
    showMessageModal,
    readResource,
    removeResource,
    downloadResource,
    listReviews,
    createReview,
    pushState: push,
    previewResources,
  }
)(ResourcesView);
