import PropTypes from 'prop-types';
import React from 'react';
import { PinterestButton } from 'react-social';
import styles from './SharePinterestButton.module.scss';

const SharePinterestButton = ({ url }) => {
  return (
    <PinterestButton className={styles.pinterest} element="a" url={url}>
      <i className="icon-pinterest3" />
    </PinterestButton>
  );
};

SharePinterestButton.propTypes = {
  url: PropTypes.string,
};

export default SharePinterestButton;
