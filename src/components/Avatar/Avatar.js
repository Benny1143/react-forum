import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// import { AvatarForm } from 'components';
// import config from '../../config';
import Helmet from 'react-helmet';
import { toastr } from 'react-redux-toastr';
// import { list as listResources } from 'redux/modules/resources';
import { update as updateUser } from 'redux/modules/users';
import { uploadFile } from 'redux/modules/s3';

class Avatar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    };
  }

  handleFile = event => {
    const reader = new FileReader();
    const file = event.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      toastr.error(
        'Please choose an image file that is smaller than 10Mb in size'
      );
      return;
    }

    reader.onload = upload => {
      this.setState({
        dataURI: upload.target.result,
        fileName: file.name,
        fileType: file.type,
      });
    };

    reader.readAsDataURL(file);
  };

  handleCrop = () => {
    require('blueimp-canvas-to-blob');
    this.cropper.getCroppedCanvas().toBlob(blob => {
      this.setState({
        file: blob,
      });
    }, this.state.fileType);
  };

  handleSubmit = () => {
    this.setState({ submitting: true });
    this.props
      .uploadFile(this.state.file)
      .then(avatar => {
        return this.props.updateUser({ _id: this.props.user._id, avatar });
      })
      .then(() => {
        // console.log(res);
        // const resource = res.data;

        this.setState({
          submitting: false,
          dataURI: undefined,
          fileName: undefined,
          fileType: undefined,
          file: undefined,
        });
        toastr.success(
          'Successful Update',
          'Your profile picture has been updated!'
        );
      })
      .catch(() => {
        this.setState({
          submitting: false,
          dataURI: undefined,
          fileName: undefined,
          fileType: undefined,
          file: undefined,
        });
        toastr.error(
          'Failed Update',
          'Your profile picture could not be updated!'
        );
      });
  };

  render() {
    const styles = require('./Avatar.module.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    const { user } = this.props;
    return (
      <div className="page-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <Helmet>
          <title>{'Update Profile Picture'}</title>
        </Helmet>
        <div className="cs-user-content">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title">
                <h2>{'Update Profile Picture'}</h2>
              </div>
            </div>
            {!this.state.dataURI && (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div>
                  <img
                    src={user.avatar || require('assets/img/avatar.png')}
                    alt={user.name}
                  />
                </div>
                <div className={styles.fileInput}>
                  <label htmlFor="avatar" className="file-input btn-file">
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={this.handleFile}
                    />
                    Upload Image
                  </label>
                </div>
              </div>
            )}
            {!!this.state.dataURI && (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Cropper
                  ref={component => {
                    this.cropper = component;
                  }}
                  src={this.state.dataURI}
                  style={{ height: '300px', width: '300px' }}
                  aspectRatio={1}
                  guides={false}
                  crop={this.handleCrop}
                />
                <div className="input-button" style={{ marginTop: '20px' }}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className={
                      'cs-button cs-bgcolor' +
                      (this.state.submitting ? '' : ' csborder-color')
                    }
                    disabled={this.state.submitting}
                    onClick={this.handleSubmit}
                  >
                    {this.state.submitting ? 'Submitting...' : 'Save'}
                  </a>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className="cs-button cs-bgcolor"
                    style={{ marginLeft: '5px' }}
                    onClick={() => {
                      this.setState({ dataURI: undefined });
                    }}
                  >
                    Cancel
                  </a>
                </div>
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
    const {
      match: {
        params: { userId },
      },
    } = ownProps;

    const user = userId
      ? users[userId]
      : state.auth.user && users[state.auth.user];

    return { user, userId };
  },
  { updateUser, uploadFile }
)(Avatar);
