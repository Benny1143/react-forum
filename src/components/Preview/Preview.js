import React from 'react';
import { Link } from 'react-router-dom';
import { mapEntityToKeyword, mapValueToName } from 'utils/config';

function Preview(props) {
  const { resource, users, subjects, levels } = props;
  const author = resource && resource.author && users && users[resource.author];

  return (
    <div key={resource._id}>
      <div className="cs-courses courses-grid" style={{ margin: '0 10px' }}>
        <div className="cs-media">
          <figure>
            <Link
              to={`/${mapEntityToKeyword('resource')}/${resource.subject}/${
                resource.slug
              }`}
            >
              <div
                style={{
                  backgroundImage: `url(${resource.avatar ||
                    require('assets/img/resource.png')})`,
                }}
              />
            </Link>
          </figure>
        </div>
        <div className="cs-text">
          {/*
            <div className="cs-rating">
              <div className="cs-rating-star">
                <span className="rating-box" style={{ width: '100%' }}></span>
              </div>
            </div>
          */}
          <span className="cs-caption">
            {mapValueToName(subjects, resource.subject)}
          </span>
          {resource.levels.map(level => (
            <span className="cs-caption" key={level}>
              {mapValueToName(levels, level)}
            </span>
          ))}
          <div className="cs-post-title">
            <h5>
              <Link
                to={`/${mapEntityToKeyword('resource')}/${resource.subject}/${
                  resource.slug
                }`}
              >
                {resource.name}
              </Link>
            </h5>
            <div>
              <i className="icon-download" />
              {` ${resource.nDownloads} Downloads`}
            </div>
          </div>
          <div className="cs-post-meta">
            <span>
              By&nbsp;
              <Link to={`/users/${author && author._id}`} className="cs-color">
                {author && author.name}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
