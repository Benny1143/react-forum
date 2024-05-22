import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, NavLink, matchPath } from 'react-router-dom';
import cx from 'classnames';

class NavItem extends Component {
  static propTypes = {
    index: PropTypes.bool.isRequired,
    onlyActiveOnIndex: PropTypes.bool.isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  static defaultProps = {
    index: false,
    onlyActiveOnIndex: false,
  };

  render() {
    const { router } = this.context;
    const { index, onlyActiveOnIndex, to, children, className } = this.props;

    let isActive = false;
    if (to && router && router.location) {
      isActive = onlyActiveOnIndex
        ? index && !!matchPath(router.location.pathname, { path: to })
        : !!matchPath(router.location.pathname, { path: to });
    }
    const LinkComponent = index ? Link : NavLink;

    return (
      <li className={isActive ? cx('active', className) : className}>
        <LinkComponent to={to}>{children}</LinkComponent>
      </li>
    );
  }
}

export default NavItem;
