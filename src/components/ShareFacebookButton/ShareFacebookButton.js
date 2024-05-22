import PropTypes from 'prop-types';
import React from 'react';
import { FacebookButton } from 'react-social';
import styles from './ShareFacebookButton.module.scss';

const ShareFacebookButton = ({ url, appId }) => {
  return (
    <FacebookButton
      className={styles.facebook}
      element="a"
      url={url}
      appId={appId}
    >
      <i className="icon-facebook2" />
    </FacebookButton>
  );
};

ShareFacebookButton.propTypes = {
  url: PropTypes.string,
  appId: PropTypes.string.isRequired,
};

export default ShareFacebookButton;
