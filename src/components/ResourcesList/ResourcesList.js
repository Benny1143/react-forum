import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import qs from 'query-string';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { list as listResources } from 'redux/modules/resources';
import Pagination from '../Pagination/Pagination';
// import { NavItem } from 'components';
import { mapEntityToKeyword, searchToQuery } from 'utils/config';

const defaultChecked = {
  subjects: {},
  levels: {},
  types: {},
  difficulties: {},
};

class ResourcesList extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    mainLevel: PropTypes.string,
    dataByPage: PropTypes.object,
    total: PropTypes.number,
    checked: PropTypes.object,
    search: PropTypes.string,
    page: PropTypes.number,
    listResources: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      mainLevel: props.mainLevel,
      search: props.search,
      checked: props.checked,
      limit: 9,
    };
  }

  componentDidMount() {
    const { mainLevel, checked, search, page } = this.props;

    const { subjects, levels, types, difficulties } = Object.keys(
      defaultChecked
    ).reduce((acc, key) => {
      acc[key] = Object.keys(checked[key]).reduce((res, value) => {
        if (checked[key][value]) {
          res.push(value);
        }
        return res;
      }, []);
      return acc;
    }, {});
    const filter = {
      ...{
        mainLevel: mainLevel ? mainLevel : undefined,
        subject: !!subjects.length ? subjects : undefined,
        levels: !!levels.length ? levels : undefined,
        types: !!types.length ? types : undefined,
        difficulty: !!difficulties.length ? difficulties : undefined,
      },
    };
    this.props.listResources({ filter, search, limit: this.state.limit, page });
  }

  componentDidUpdate(prevProps) {
    const {
      mainLevel: oldMainLevel,
      checked: oldChecked,
      search: oldSearch,
      page: oldPage,
    } = prevProps;
    const { mainLevel, checked, search, page } = this.props;

    if (
      oldMainLevel !== mainLevel ||
      JSON.stringify(oldChecked) !== JSON.stringify(checked) ||
      oldSearch !== search ||
      oldPage !== page
    ) {
      const { subjects, levels, types, difficulties } = Object.keys(
        defaultChecked
      ).reduce((acc, key) => {
        acc[key] = Object.keys(checked[key]).reduce((res, value) => {
          if (checked[key][value]) {
            res.push(value);
          }
          return res;
        }, []);
        return acc;
      }, {});
      const filter = {
        ...{
          mainLevel: mainLevel ? mainLevel : undefined,
          subject: !!subjects.length ? subjects : undefined,
          levels: !!levels.length ? levels : undefined,
          types: !!types.length ? types : undefined,
          difficulty: !!difficulties.length ? difficulties : undefined,
        },
      };
      this.props.listResources({
        filter,
        search,
        limit: this.state.limit,
        page,
      });
      this.setState({
        mainLevel,
        search,
        checked,
      });
    }
  }

  handleSelectCheckbox = (type, value) => () => {
    this.setState({
      checked: {
        ...this.state.checked,
        [type]: {
          ...this.state.checked[type],
          [value]: !this.state.checked[type][value],
        },
      },
    });
  };

  handleFormSearch = event => {
    const { mainLevel, search, checked } = this.state;

    event.preventDefault();

    this.props.pushState({
      pathname: `/${mapEntityToKeyword('resources')}/${
        mainLevel ? mainLevel : 'list'
      }`,
      search: `?${qs.stringify({
        search: JSON.stringify(search),
        checked: JSON.stringify(checked),
      })}`,
    });
  };

  handleChangePage = page => event => {
    const { mainLevel, search, checked } = this.state;

    event.preventDefault();

    this.props.pushState({
      pathname: `/${mapEntityToKeyword('resources')}/${
        mainLevel ? mainLevel : 'list'
      }`,
      search: `?${qs.stringify({
        search: JSON.stringify(search),
        checked: JSON.stringify(checked),
        page,
      })}`,
    });
  };

  render() {
    // const styles = require('./ResourcesList.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    const {
      config: { mainLevels, subjects, levels, types, difficulties },
      users,
      resources,
      mainLevel,
      dataByPage,
      total,
      page,
    } = this.props;
    const data = (dataByPage && dataByPage[page]) || [];

    const filteredSubjects =
      (subjects &&
        Object.values(subjects)
          .filter(subject =>
            this.state.mainLevel
              ? subject.mainLevel === this.state.mainLevel
              : true
          )
          .map(subject =>
            this.state.mainLevel
              ? subject
              : {
                  ...subject,
                  name: `${subject.name} (${mainLevels[subject.mainLevel].name})`,
                }
          )) ||
      [];
    const filteredLevels =
      (levels &&
        Object.values(levels).filter(level =>
          this.state.mainLevel ? level.mainLevel === this.state.mainLevel : true
        )) ||
      [];

    return (
      <div>
        <div
          className="page-section"
          style={{ background: '#ebebeb', padding: '50px 0 35px' }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-page-title">
                  <h1>{`${mainLevel &&
                    `${mainLevels[mainLevel].title} `}Resources`}</h1>
                  <p style={{ color: '#aaa' }}>
                    Find the resources that you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-section">
          <div className="page-section">
            <div className="container">
              <Helmet>
                <title>Resources</title>
              </Helmet>
              <div className="row">
                <aside className="page-sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <div className="cs-find-search">
                    <h6>Filter</h6>
                    <form onSubmit={this.handleFormSearch}>
                      <div className="cs-input-area">
                        <select
                          placeholder="Select Category"
                          className="chosen-select"
                          value={this.state.mainLevel}
                          onChange={event => {
                            this.setState({ mainLevel: event.target.value });
                          }}
                        >
                          <option value="">Select Level Category</option>
                          {mainLevels &&
                            Object.values(mainLevels).map(({ value, name }) => (
                              <option value={value} key={value}>
                                {name}
                              </option>
                            ))}
                        </select>
                        <div className="cs-input-holder">
                          <i className="icon-search" />
                          <input
                            type="text"
                            placeholder="Enter search text"
                            value={this.state.search}
                            onChange={event => {
                              this.setState({
                                search: event.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <button type="submit">
                        <i className="icon-search3" />
                        &nbsp;Search
                      </button>
                    </form>
                  </div>
                  <div className="cs-listing-filters">
                    <PanelGroup id="filters">
                      <Panel
                        collapsible="true"
                        defaultExpanded
                        header={<h6 className="panel-title">Subjects</h6>}
                      >
                        <div className="cs-select-checklist">
                          <ul
                            className="cs-checkbox-list mCustomScrollbar mCS_no_scrollbar"
                            data-mcs-theme="dark"
                          >
                            {filteredSubjects.map(subject => (
                              <li key={subject.value}>
                                <div className="checkbox">
                                  <input
                                    id={`checkbox-subject-${subject.value}`}
                                    type="checkbox"
                                    checked={
                                      !!this.state.checked.subjects[
                                        subject.value
                                      ]
                                    }
                                    onChange={this.handleSelectCheckbox(
                                      'subjects',
                                      subject.value
                                    )}
                                  />
                                  <label
                                    htmlFor={`checkbox-subject-${subject.value}`}
                                  >
                                    {subject.name}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Panel>
                      <Panel
                        collapsible="true"
                        defaultExpanded
                        header={<h6 className="panel-title">Levels</h6>}
                      >
                        <div className="cs-select-checklist">
                          <ul
                            className="cs-checkbox-list mCustomScrollbar mCS_no_scrollbar"
                            data-mcs-theme="dark"
                          >
                            {filteredLevels.map(level => (
                              <li key={level.value}>
                                <div className="checkbox">
                                  <input
                                    id={`checkbox-level-${level.value}`}
                                    type="checkbox"
                                    checked={
                                      !!this.state.checked.levels[level.value]
                                    }
                                    onChange={this.handleSelectCheckbox(
                                      'levels',
                                      level.value
                                    )}
                                  />
                                  <label
                                    htmlFor={`checkbox-level-${level.value}`}
                                  >
                                    {level.name}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Panel>
                      <Panel
                        collapsible="true"
                        header={<h6 className="panel-title">Type</h6>}
                      >
                        <div className="cs-select-checklist">
                          <ul>
                            {types &&
                              Object.values(types).map(type => (
                                <li key={type.value}>
                                  <div className="checkbox">
                                    <input
                                      id={`checkbox-type-${type.value}`}
                                      type="checkbox"
                                      checked={
                                        !!this.state.checked.types[type.value]
                                      }
                                      onChange={this.handleSelectCheckbox(
                                        'types',
                                        type.value
                                      )}
                                    />
                                    <label
                                      htmlFor={`checkbox-type-${type.value}`}
                                    >
                                      {type.name}
                                    </label>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </Panel>
                      <Panel
                        collapsible="true"
                        header={<h6 className="panel-title">Difficulty</h6>}
                      >
                        <div className="cs-select-checklist">
                          <ul>
                            {difficulties &&
                              Object.values(difficulties).map(difficulty => (
                                <li key={difficulty.value}>
                                  <div className="checkbox">
                                    <input
                                      id={`checkbox-difficulty-${difficulty.value}`}
                                      type="checkbox"
                                      checked={
                                        !!this.state.checked.difficulties[
                                          difficulty.value
                                        ]
                                      }
                                      onChange={this.handleSelectCheckbox(
                                        'difficulties',
                                        difficulty.value
                                      )}
                                    />
                                    <label
                                      htmlFor={`checkbox-difficulty-${difficulty.value}`}
                                    >
                                      {difficulty.name}
                                    </label>
                                    <span className="cs-values">
                                      {difficulty.value === 'easy' && <em />}
                                      {difficulty.value === 'intermediate' && (
                                        <em />
                                      )}
                                      {difficulty.value === 'intermediate' && (
                                        <em />
                                      )}
                                      {difficulty.value === 'hard' && <em />}
                                      {difficulty.value === 'hard' && <em />}
                                      {difficulty.value === 'hard' && <em />}
                                    </span>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </Panel>
                    </PanelGroup>
                  </div>
                  <div
                    className="cs-find-search"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <form onSubmit={this.handleFormSearch}>
                      <button type="submit">
                        <i className="icon-search3" />
                        &nbsp;Search
                      </button>
                    </form>
                  </div>
                </aside>
                <div className="page-content col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="row">
                    {data && !data.length && <div>No resources found.</div>}
                    {data.map(resourceId => {
                      const resource = resources[resourceId];
                      const author =
                        resource &&
                        resource.author &&
                        users &&
                        users[resource.author];
                      return (
                        <div
                          className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                          key={resource._id}
                        >
                          <div className="cs-courses courses-grid">
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
                              <div className="cs-rating">
                                {/*
                                    <div className="cs-rating-star">
                                      <span className="rating-box" style={{ width: `${resource.rating ? (resource.rating * 100) : 0}%` }}></span>
                                    </div>
                                  */}
                                <span className="cs-caption">
                                  {subjects &&
                                    subjects[resource.subject] &&
                                    subjects[resource.subject].name}
                                </span>
                                {resource.levels.map(level => (
                                  <span className="cs-caption" key={level}>
                                    {levels &&
                                      levels[level] &&
                                      levels[level].name}
                                  </span>
                                ))}
                              </div>
                              <div className="cs-post-title">
                                <h5>
                                  <Link
                                    to={`/${mapEntityToKeyword('resource')}/${
                                      resource.subject
                                    }/${resource.slug}`}
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
                    {/*
                      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="cs-courses courses-grid">
                          <div className="cs-media">
                            <figure><a href="#"><img src={require('../../theme/extra-images/course-grid-img1.jpg')} alt=""/></a></figure>
                          </div>
                          <div className="cs-text">
                            <span className="cs-caption">CC</span>
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span className="rating-box" style={{ width: '100%' }}></span>
                              </div>
                            </div>
                            <div className="cs-post-title">
                              <h5><a href="#">Latest Computer Science and Programming</a></h5>
                            </div>
                            <span className="cs-courses-price"><em>$</em>289.99</span>
                            <div className="cs-post-meta">
                              <span>By
                                <a href="#" className="cs-color">James,</a>
                                <a href="#" className="cs-color">Howdson</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="cs-courses courses-grid">
                          <div className="cs-media">
                            <figure><a href="#"><img src={require('../../theme/extra-images/course-grid-img2.jpg')} alt=""/></a></figure>
                          </div>
                          <div className="cs-text">
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span className="rating-box" style={{ width: '100%' }}></span>
                              </div>
                            </div>
                            <div className="cs-post-title">
                              <h5><a href="#">Basic Time Management Course</a></h5>
                            </div>
                            <span className="cs-courses-price"><em>$</em>189.99</span>
                            <div className="cs-post-meta">
                              <span>By
                                <a href="#" className="cs-color">James,</a>
                                <a href="#" className="cs-color">Howdson</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="cs-courses courses-grid">
                          <div className="cs-media">
                            <figure><a href="#"><img src={require('../../theme/extra-images/course-grid-img3.jpg')} alt=""/></a></figure>
                          </div>
                          <div className="cs-text">
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span className="rating-box" style={{ width: '100%' }}></span>
                              </div>
                            </div>
                            <div className="cs-post-title">
                              <h5><a href="#">How to Become a Startup Founder</a></h5>
                            </div>
                            <span className="cs-courses-price"><em>$</em>175.99</span>
                            <div className="cs-post-meta">
                              <span>By
                                <a href="#" className="cs-color">James,</a>
                                <a href="#" className="cs-color">Howdson</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="cs-courses courses-grid">
                          <div className="cs-media">
                            <figure><a href="#"><img src={require('../../theme/extra-images/course-grid-img4.jpg')} alt=""/></a></figure>
                          </div>
                          <div className="cs-text">
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span className="rating-box" style={{ width: '100%' }}></span>
                              </div>
                            </div>
                            <div className="cs-post-title">
                              <h5><a href="#">How to Design a Logo a Beginners Course</a></h5>
                            </div>
                            <span className="cs-courses-price"><em>$</em>49.99</span>
                            <div className="cs-post-meta">
                              <span>By
                                <a href="#" className="cs-color">James,</a>
                                <a href="#" className="cs-color">Howdson</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="cs-courses courses-grid">
                          <div className="cs-media">
                            <figure><a href="#"><img src={require('../../theme/extra-images/course-grid-img5.jpg')} alt=""/></a></figure>
                          </div>
                          <div className="cs-text">
                            <span className="cs-caption">CC</span>
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span className="rating-box" style={{ width: '100%' }}></span>
                              </div>
                            </div>
                            <div className="cs-post-title">
                              <h5><a href="#">Introduction to Mobile Apps Development</a></h5>
                            </div>
                            <span className="cs-courses-price"><em>$</em>155.99</span>
                            <div className="cs-post-meta">
                              <span>By
                                <a href="#" className="cs-color">James,</a>
                                <a href="#" className="cs-color">Howdson</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <div className="cs-courses courses-grid">
                          <div className="cs-media">
                            <figure><a href="#"><img src={require('../../theme/extra-images/course-grid-img6.jpg')} alt=""/></a></figure>
                          </div>
                          <div className="cs-text">
                            <div className="cs-rating">
                              <div className="cs-rating-star">
                                <span className="rating-box" style={{ width: '100%' }}></span>
                              </div>
                            </div>
                            <div className="cs-post-title">
                              <h5><a href="#">Latest Computer Science and Programming</a></h5>
                            </div>
                            <span className="cs-free">Free</span>
                            <div className="cs-post-meta">
                              <span>By
                                <a href="#" className="cs-color">James,</a>
                                <a href="#" className="cs-color">Howdson</a>
                              </span>
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
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {
      entities: { users, resources },
    } = state;
    const {
      match: {
        params: { mainLevel = '' },
      },
    } = ownProps;
    const dataByPage = state.resources.idsByPage;
    const total = state.resources.total;
    const location = ownProps.location;
    const query = searchToQuery(location.search);
    const checked =
      (query && query.checked && JSON.parse(query.checked)) || defaultChecked;
    const search = (query && query.search && JSON.parse(query.search)) || '';
    const page = (query && query.page && parseInt(query.page, 10)) || 1;

    return {
      user: state.auth.user,
      config: state.config.dataByValue,
      users,
      resources,
      mainLevel,
      dataByPage,
      total,
      checked,
      search,
      page,
    };
  },
  { listResources, pushState: push }
)(ResourcesList);
