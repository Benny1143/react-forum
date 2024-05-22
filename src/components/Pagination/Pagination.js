import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import styles from './Pagination.module.scss';

const Pagination = ({ total = 1, current = 1, onClick = () => () => {} }) => {
  if (total === 1) {
    return null;
  }
  const delta = 2;
  const left = current - delta;
  const right = current + delta;
  const range = [...Array(delta * 2 + 1).keys()].reduce((acc, counter) => {
    const cur = current - delta + counter;
    if (cur >= 1 && cur <= total) acc.push(cur);
    return acc;
  }, []);
  const getPage = num => (
    <li
      key={num}
      className={num === current ? cx(styles.active, 'active') : ''}
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a onClick={onClick(num)}>{num}</a>
    </li>
  );
  const ellipsis = (
    <li>
      <span>&hellip;</span>
    </li>
  );
  return (
    <div className="cs-pagination">
      <ul className={cx(styles.pagination, 'pagination')}>
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          {(current > 1 && <a onClick={onClick(current - 1)}>&lt;</a>) || (
            <span>&lt;</span>
          )}
        </li>
        {1 < left && getPage(1)}
        {2 < left && ellipsis}
        {range.map(num => getPage(num))}
        {total > right + 1 && ellipsis}
        {total > right && getPage(total)}
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          {(current < total && <a onClick={onClick(current + 1)}>&gt;</a>) || (
            <span>&gt;</span>
          )}
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Pagination;
