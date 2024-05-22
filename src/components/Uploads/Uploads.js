import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import Pagination from '../Pagination/Pagination';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import qs from 'query-string';
import excerptHtml from 'html-excerptor';
import {
  list as listResources,
  load as loadResources,
} from 'redux/modules/resources';
import {
  mapEntityToKeyword,
  mapValueToName,
  searchToQuery,
} from 'utils/config';

class Uploads extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string,
    config: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    dataByPage: PropTypes.object,
    total: PropTypes.number,
    location: PropTypes.object,
    page: PropTypes.number,
    listResources: PropTypes.func.isRequired,
    loadResources: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  static defaultProps = {
    resources: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
    };
  }

  componentDidMount() {
    const { userId, page } = this.props;
    const isOwnProfile = !userId;
    if (isOwnProfile) {
      this.props.loadResources({ limit: this.state.limit, page });
    } else {
      this.props.listResources({
        filter: { author: userId },
        limit: this.state.limit,
        page,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { userId: oldUserId, page: oldPage } = prevProps;
    const { userId, page } = this.props;
    if (userId !== oldUserId || page !== oldPage) {
      const isOwnProfile = !userId;
      if (isOwnProfile) {
        this.props.loadResources({ limit: this.state.limit, page });
      } else {
        this.props.listResources({
          filter: { author: userId },
          limit: this.state.limit,
          page,
        });
      }
    }
  }

  handleChangePage = page => event => {
    const {
      location: { pathname, query },
    } = this.props;

    event.preventDefault();

    this.props.pushState({
      pathname,
      search: `?${qs.stringify({ ...query, page })}`,
    });
  };

  render() {
    // const styles = require('./Uploads.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    const {
      config: { subjects, levels, languages, difficulties },
      auth,
      user,
      userId,
      users,
      resources,
      dataByPage,
      total,
      page,
    } = this.props;
    const data = (dataByPage && dataByPage[page]) || [];
    const isOwnProfile = (auth && userId && auth._id === userId) || false;

    return (
      <div
        className={
          isOwnProfile
            ? 'page-content col-lg-8 col-md-8 col-sm-12 col-xs-12'
            : 'section-content col-lg-9 col-md-9 col-sm-12 col-xs-12'
        }
      >
        <Helmet>
          <title>
            {isOwnProfile
              ? 'My Uploaded Resources'
              : `${user.name}'s Resources`}
          </title>
        </Helmet>
        <div className="cs-user-content cs-instructor">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title">
                {isOwnProfile && <h2>My Uploaded Resources</h2>}
                {!isOwnProfile && <h3>{`${user.name}'s Resources`}</h3>}
              </div>
            </div>
            <ul className="cs-courses courses-listing">
              {data && !data.length && <div>No resources found.</div>}
              {data.map(resourceId => {
                const resource = resources[resourceId];
                const author =
                  resource &&
                  resource.author &&
                  users &&
                  users[resource.author];
                if (!resource) return null;
                return (
                  <li
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={resource._id}
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
                      <div className="cs-post-title">
                        <h4>
                          <Link
                            to={`/${mapEntityToKeyword('resource')}/${
                              resource.subject
                            }/${resource.slug}`}
                          >
                            {resource.name}
                          </Link>
                        </h4>
                        {!isOwnProfile && (
                          <div className="cs-post-meta">
                            <span className="post-by">
                              By&nbsp;
                              <Link
                                to={`/users/${author && author._id}`}
                                className="cs-color"
                              >
                                {author && author.name}
                              </Link>
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="cs-price-sec">
                        <div className="cs-rating">
                          <div className="cs-rating-star">
                            <span
                              className="rating-box"
                              style={{
                                width: `${
                                  resource.rating ? resource.rating * 100 : 0
                                }%`,
                              }}
                            />
                          </div>
                          <em>
                            {resource.rating
                              ? (resource.rating * 5).toFixed(1)
                              : 0}
                          </em>
                        </div>
                      </div>
                      <div>
                        {auth && author && auth._id === author._id && (
                          <span style={{ float: 'right' }}>
                            <Link
                              to={`/${mapEntityToKeyword('resources')}/edit/${
                                resource._id
                              }`}
                              className="cs-btn small cs-bgcolor"
                            >
                              <i className="icon-edit" />
                              &nbsp;Edit
                            </Link>
                          </span>
                        )}
                        <p className="rich_editor_text">
                          {excerptHtml(resource.description)}
                        </p>
                      </div>
                      <div className="cs-post-options">
                        <span>
                          <span className="cs-values">
                            {resource.difficulty === 'easy' && <em />}
                            {resource.difficulty === 'intermediate' && <em />}
                            {resource.difficulty === 'intermediate' && <em />}
                            {resource.difficulty === 'hard' && <em />}
                            {resource.difficulty === 'hard' && <em />}
                            {resource.difficulty === 'hard' && <em />}
                          </span>
                          {mapValueToName(difficulties, resource.difficulty)}
                        </span>
                        <span>
                          <i className="icon-earth" />
                          {mapValueToName(languages, resource.language)}
                        </span>
                        <span>
                          <i className="icon-download" />
                          {resource.nDownloads}
                        </span>
                        <span>
                          <span className="cs-caption">
                            {mapValueToName(subjects, resource.subject)}
                          </span>
                          {resource.levels.map(level => (
                            <span className="cs-caption" key={level}>
                              {mapValueToName(levels, level)}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {data && !!data.length && (
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                style={{ textAlign: 'center' }}
              >
                <Pagination
                  total={Math.ceil(total / this.state.limit)}
                  current={page}
                  onClick={this.handleChangePage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {
      entities: { users, resources },
    } = state;
    const { user } = ownProps;

    const auth = state.auth.user && users && users[state.auth.user];
    const userId = user._id;
    const dataByPage = state.resources.idsByPage;
    const total = state.resources.total;
    const location = ownProps.location;
    const query = searchToQuery(location.search);
    const page = (query && query.page && parseInt(query.page, 10)) || 1;

    return {
      auth,
      user,
      userId,
      config: state.config.dataByValue,
      users,
      resources,
      dataByPage,
      total,
      location,
      page,
    };
  },
  { listResources, loadResources, pushState: push }
)(Uploads);
