import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './Star.module.scss';

class Star extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    isActiveHalf: PropTypes.bool,
    willBeActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  static defaultProps = {
    isActive: false,
    isActiveHalf: false,
    willBeActive: false,
    isDisabled: false,
  };

  render() {
    const { isActive, isActiveHalf, willBeActive, isDisabled } = this.props;
    const { onClick, onMouseEnter } = this.props;

    const className = Object.keys(styles)
      .filter(prop => this.props[prop])
      .map(prop => styles[prop])
      .join(' ');

    if (isActive || isActiveHalf || willBeActive || isDisabled) {
      return (
        <i
          className={cx('icon-star2', styles.isDefault, className)}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
        />
      );
    }
    return (
      <i
        className={cx('icon-star-o', styles.isDefault, className)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      />
    );
  }
}

export default Star;
