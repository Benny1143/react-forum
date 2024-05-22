import PropTypes from 'prop-types';
import React from 'react';
import { GooglePlusButton } from 'react-social';
import styles from './ShareGoogleButton.module.scss';

const ShareGoogleButton = ({ url }) => {
  return (
    <GooglePlusButton className={styles.google} element="a" url={url}>
      <i className="icon-google-plus" />
    </GooglePlusButton>
  );
};

ShareGoogleButton.propTypes = {
  url: PropTypes.string,
};

export default ShareGoogleButton;
