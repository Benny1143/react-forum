import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
// import { CounterButton, GithubButton } from 'components';
// import config from '../../config';
import Helmet from 'react-helmet';
import { list as listUsers } from 'redux/modules/users';
// import { mapEntityToKeyword, mapValueToName } from 'utils/config';

class Followers extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object.isRequired,
    userId: PropTypes.string,
    config: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    dataByPage: PropTypes.object,
    total: PropTypes.number,
    listUsers: PropTypes.func.isRequired,
  };

  static defaultProps = {
    users: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.listUsers({
      filter: { _id: user.followers },
      limit: this.state.limit,
      page: this.state.page,
    });
  }

  componentDidUpdate(prevProps) {
    const { userId: oldUserId } = prevProps;
    const { userId, user } = this.props;
    if (userId !== oldUserId) {
      this.props.listUsers({
        filter: { _id: user.followers },
        limit: this.state.limit,
        page: this.state.page,
      });
    }
  }

  handleChangePage = page => () => {
    const { user } = this.props;
    this.props.listUsers({
      filter: { _id: user.followers },
      limit: this.state.limit,
      page: this.state.page,
    });

    this.setState({ page });
  };

  render() {
    // const styles = require('./Followers.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    const { auth, user, userId, users, dataByPage, total } = this.props;
    const data = (dataByPage && dataByPage[this.state.page]) || [];
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
            {isOwnProfile ? 'My Followers' : `${user.name}'s Followers`}
          </title>
        </Helmet>
        <div className="cs-user-content cs-instructor">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title">
                {isOwnProfile && <h2>My Followers</h2>}
                {!isOwnProfile && <h3>{`${user.name}'s Followers`}</h3>}
              </div>
            </div>
            <ul className="cs-courses courses-listing">
              {data && !data.length && <div>No followers found.</div>}
              {data.map(followerId => {
                const follower = users[followerId];
                if (!follower) return null;
                return (
                  <div className="profile-pic" key={followerId}>
                    <div className="cs-media">
                      <figure>
                        <Link to={`/users/${follower._id}`}>
                          <img
                            src={
                              follower.avatar ||
                              require('assets/img/avatar.png')
                            }
                            alt={follower.name}
                          />
                        </Link>
                      </figure>
                    </div>
                  </div>
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
                  current={this.state.page}
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
      entities: { users },
    } = state;
    const { user } = ownProps;

    const auth = state.auth.user && users && users[state.auth.user];
    const userId = user._id;
    const dataByPage = state.users.idsByPage;
    const total = state.users.total;

    return {
      auth,
      user,
      userId,
      users,
      dataByPage,
      total,
    };
  },
  { listUsers }
)(Followers);
