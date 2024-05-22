import React from 'react';

export default function NotFound() {
  return (
    <div className="main-section">
      <div
        className="page-section"
        style={{ paddingTop: '124px', paddingBottom: '130px' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-error-content">
                <strong>404</strong>
                <em>page not found</em>
                <p>The page you are looking for does not exist.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
