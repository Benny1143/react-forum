import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileInfoList from '../ProfileInfoList/ProfileInfoList';
import ShareButton from '../ShareButton/ShareButton';
// import config from '../../config';
import Helmet from 'react-helmet';
// import { list as listResources } from 'redux/modules/resources';

class Profile extends Component {
  static propTypes = {
    config: PropTypes.object,
    auth: PropTypes.object,
    user: PropTypes.object,
    isOwnProfile: PropTypes.bool,
    isFollower: PropTypes.bool,
    showSignupModal: PropTypes.func,
    handleClickFollow: PropTypes.func,
  };

  render() {
    // const styles = require('./Profile.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    const {
      config,
      auth,
      user,
      isOwnProfile,
      isFollower,
    } = this.props;

    if (!user) {
      return null;
    }

    if (isOwnProfile) {
      return (
        <div className="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <Helmet>
            <title>Profile</title>
          </Helmet>
          <div className="cs-user-content">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-section-title">
                  <h2>{`About ${user.name}`}</h2>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-user-detail">
                  <ProfileInfoList config={config} user={user} />
                  <p>{user.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="section-content col-lg-9 col-md-9 col-sm-12 col-xs-12">
        <Helmet>
          <title>{`About ${user.name}`}</title>
        </Helmet>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="cs-author-info">
            <div className="alignleft">
              <h3>{`About ${user.name}`}</h3>
              {user.tutor && user.tutor.isVolunteer && (
                <span>Volunteer Tutor</span>
              )}
            </div>
            <div className="alignright">
              <div className="cs-social-media">
                <ul>
                  {user.socialProfiles && user.socialProfiles.facebook && (
                    <li>
                      <a
                        data-original-title="facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socialProfiles.facebook}
                      >
                        <i className="icon-facebook2" />
                      </a>
                    </li>
                  )}
                  {user.socialProfiles && user.socialProfiles.pinterest && (
                    <li>
                      <a
                        data-original-title="pinterest"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socialProfiles.pinterest}
                      >
                        <i className="icon-pinterest3" />
                      </a>
                    </li>
                  )}
                  {user.socialProfiles && user.socialProfiles.twitter && (
                    <li>
                      <a
                        data-original-title="twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socialProfiles.twitter}
                      >
                        <i className="icon-twitter2" />
                      </a>
                    </li>
                  )}
                  {user.socialProfiles && user.socialProfiles.linkedin && (
                    <li>
                      <a
                        data-original-title="linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socialProfiles.linkedin}
                      >
                        <i className="icon-linkedin22" />
                      </a>
                    </li>
                  )}
                  {user.socialProfiles && user.socialProfiles.google && (
                    <li>
                      <a
                        data-original-title="google"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socialProfiles.google}
                      >
                        <i className="icon-google-plus" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <ShareButton appId={process.env.REACT_APP_FB_APP_ID} />
              {auth && !isFollower && (
                /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                <a onClick={this.props.handleClickFollow} className="share-btn">
                  <i className="icon-user-plus" />
                  Follow
                </a>
              )}
              {!auth && (
                /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                <a onClick={this.props.showSignupModal} className="share-btn">
                  <i className="icon-user-plus" />
                  Follow
                </a>
              )}
              <div className="post-options">
                <span className="post-likes">
                  <Link to={`/users/${user._id}/followers`}>
                    <i className="icon-heart-o" />
                    {user.followers.length} Follower
                    {user.followers.length === 1 ? '' : 's'}
                  </Link>
                </span>
              </div>
            </div>
            <ProfileInfoList config={config} user={user} />
            <div className="rich_editor_text">
              <p>{user.description}</p>
              <Link
                to={`/users/${user._id}/uploads`}
                className="cs-btn large cs-bgcolor"
              >
                View Uploaded Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
