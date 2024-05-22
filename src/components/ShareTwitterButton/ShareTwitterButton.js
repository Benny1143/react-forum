import PropTypes from 'prop-types';
import React from 'react';
import { TwitterButton } from 'react-social';
import styles from './ShareTwitterButton.module.scss';

const ShareTwitterButton = ({ url, message = 'Free notes here:' }) => {
  return (
    <TwitterButton
      className={styles.twitter}
      element="a"
      url={url}
      message={message}
    >
      <i className="icon-twitter2" />
    </TwitterButton>
  );
};

ShareTwitterButton.propTypes = {
  url: PropTypes.string,
  message: PropTypes.string,
};

export default ShareTwitterButton;
