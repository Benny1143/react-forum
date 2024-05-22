import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

export default class FAQ extends PureComponent {
  render() {
    const styles = require('./FAQ.module.scss');
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>Frequently Asked Questions</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-section-title center">
                  <h2>FREQUENTLY ASKED QUESTIONS:</h2>
                  <hr className={styles.bluedivider} />
                  <p>
                    Have some burning questions? Here are some common questions
                    we get asked!
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-9">
                <br />
                <p>
                  1. How does this work?
                  <br />
                  We are an open sharing platform where all users are not just
                  able to download but are strongly encouraged to share and
                  upload free resources as well. This enables a continuous and
                  ever-growing database of good resources
                </p>
                <br />
                <p>
                  2. Is it possible to share hard copies of my notes?
                  <br />
                  Yes, you can download the Adobe Scan mobile app which enables
                  you to snap pages of your notes and automatically combines
                  them into a single PDF document.
                </p>
                <br />
                <p>
                  3. What are followers for?
                  <br />
                  Every follower of yours will be updated of your latest shared
                  resource! What's more, for every follower, you earn one point!
                </p>
                <br />
                <p>
                  4. Do I get any points when I donate to SmartGuppy?
                  <br />
                  Yes! Definitely! For every donation of just $10, you will
                  receive 10 points!
                </p>
                <br />
                <p>
                  5. Are points transferable?
                  <br />
                  No. They are yours and yours only!
                </p>
                <hr className={styles.bluedivider} />
                <p>
                  If there are any unanswered questions, please do not hesitate
                  to reach us at:&ensp;
                  <a
                    href="mailto:support@smartguppy.com"
                    style={{ color: '#207dba' }}
                  >
                    support@smartguppy.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
