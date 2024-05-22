import PropTypes from 'prop-types';
import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = props => {
  return (
    /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
    <a
      onClick={event => {
        event.preventDefault();
        event.stopPropagation();
        props.onCloseClicked();
      }}
      className={styles.closeButton}
    >
      &times;
    </a>
  );
};

CloseButton.propTypes = {
  onCloseClicked: PropTypes.func,
};

export default CloseButton;
