import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { toastr } from 'react-redux-toastr';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { create as createResource } from 'redux/modules/resources';
import { uploadFile } from 'redux/modules/s3';
import { mapEntityToKeyword } from 'utils/config';
import ResourcesAddEditForm from '../ResourcesAddEditForm/ResourcesAddEditForm';
import { push } from 'connected-react-router';

class ResourcesAdd extends Component {
  static propTypes = {
    // children: PropTypes.object.isRequired,
    user: PropTypes.object,
    config: PropTypes.object,
    // logout: PropTypes.func.isRequired,
    createResource: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  handleSubmit = values => {
    const {
      name,
      description,
      mainLevel,
      subject,
      levels,
      types,
      difficulty,
      language,
      files,
      avatars,
    } = values;
    const file = files && files[0];
    const avatarFile = avatars && avatars[0];
    const filePromise = file.file ? this.props.uploadFile(file.file) : file.url;
    const avatarPromise = avatarFile
      ? avatarFile.file
        ? this.props.uploadFile(avatarFile.file)
        : avatarFile.url
      : undefined;
    return Promise.all([filePromise, avatarPromise])
      .then(([url, avatar]) => {
        return this.props.createResource({
          name,
          description,
          mainLevel,
          subject,
          levels,
          types,
          difficulty,
          language,
          url,
          avatar,
        });
      })
      .then(res => {
        // console.log(res);
        const resource = res.data;

        this.props.pushState(
          `/${mapEntityToKeyword('resource')}/${resource.subject}/${
            resource.slug
          }`
        );
        toastr.success(
          'Successful Upload',
          `"${resource.name}" has been uploaded!`
        );
      });
  };

  render() {
    const {
      config: { mainLevels, subjects, levels, types, difficulties, languages },
    } = this.props;
    // const styles = require('./ResourcesAdd.scss');

    // const tags =
    //   levels && subjects &&
    //   levels.concat(subjects).sort((prev, next) => prev.name.localeCompare(next.name));

    return (
      <div className="main-section">
        <div
          className="page-section"
          style={{ paddingTop: '10px', paddingBottom: '80px' }}
        >
          <div className="container">
            <Helmet>
              <title>Upload Notes</title>
            </Helmet>
            <div className="row">
              <div className="section-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <ResourcesAddEditForm
                  mainLevels={mainLevels}
                  subjects={subjects}
                  levels={levels}
                  types={types}
                  difficulties={difficulties}
                  languages={languages}
                  onSubmit={this.handleSubmit}
                />
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
      entities: { users },
    } = state;

    const user = state.auth.user && users[state.auth.user];
    const config = state.config.data;

    return { user, config };
  },
  { /* logout, */ createResource, uploadFile, pushState: push }
)(ResourcesAdd);
