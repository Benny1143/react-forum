import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

const imgPoster = require('assets/img/levelup_poster.png');

export default class LevelUp extends PureComponent {
  render() {
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>Level Up</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="center">
                  <img
                    src={imgPoster}
                    style={{ marginBottom: '20px' }}
                    alt="Level Up"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="center">
                  <iframe
                    title="Registration Form"
                    src="https://docs.google.com/forms/d/e/1FAIpQLScrOxBsXSu7yYdHwyzNs629ft-6zsnYM0hwGtZzGwCdviU7GQ/viewform?embedded=true"
                    width="760"
                    height="1521"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                  >
                    Loading...
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
