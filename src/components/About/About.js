import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

export default class About extends PureComponent {
  render() {
    const styles = require('./About.module.scss');
    return (
      <div className="main-section center">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>About Us</title>
            </Helmet>
            <div className="row col-lg-8 col-md-12 col-xs-12 col-sm-12">
              <div style={{ marginBottom: '50px' }}>
                <h1 className="cs-color">OUR VISION</h1>
                <hr/>
                <p>A world where education is a human right.</p>
                <p>
                  Where every student can have access to any and every resource anytime, anywhere.
                </p>
                <p>                 
                  A platform where a genuine connection is forged between individuals<br/>for the common good of our society.
                </p>
                <p>
                  We strongly believe in the ability of people to rise above their self-interests, 
                  to help build a community of kind-hearted sharers in times of need.
                </p>
              </div>
              <div style={{ marginBottom: '80px' }}>
                <h1 className="cs-color">OUR MISSION</h1>
                <hr/>
                <p>
                  In the ultra-competitive education landscape of Singapore where education costs are always increasing
                  and the tuition industry is worth more than a billion dollars,<br/>
                  SmartGuppy seeks to end educational inequality which is especially exacerbated in this time of COVID-19.
                </p>
                <h3 className="cs-color">Combining the spirit of Open Education and smart technology</h3>
                <p>
                  We aim to deliver quality, customised education materials through our platform's smart recommendation system,
                  striving to ensure that every student finds the right type of notes for his or her individual learning styles and needs.
                </p>
                <h3 className="cs-color">Revolutionising the education landscape</h3>
                <p>
                  Currently, students vie with each other in an unhealthy exam-centric system,
                  resulting in the best materials and notes ending up in the hands of a privileged few.
                  We are committed to creating a culture of collaborative, not competitive, learning;
                  we strive to share as many resources with all who seek access to quality education. 
                </p>
              </div>
              <div style={{ marginBottom: '50px' }}>
                <h1 className="cs-color">OUR VALUES AND CORE ETHOS</h1>
                <hr/>
                <h3 className="cs-color">Free access, Forever</h3>
                <p>
                  We will always ensure all notes on our platform are free to every student, forever.
                </p>
                <h3 className="cs-color">Non-discrimination</h3>
                <p>
                  All students will be able to access all of our resources, especially in this time of greater online learning. 
                  We welcome everyone who wishes to use our platform for educational purposes.
                </p>
                <h3 className="cs-color">Sharing &#38; Collaboration</h3>
                <p>
                  We strive to collaborate not just with educators but with students as well.<br/>
                  We believe in the inspirational power of a sharing community where everyone has something to contribute and everyone benefits.
                </p>
                <h3 className="cs-color">Impact before profits</h3>
                <p>
                  Helping our users will always be our priority, especially in this difficult time.
                  We should believe in alleviating each other. We started SmartGuppy not to make money
                  but to create maximum positive impact by helping as many students as possible.
                </p>
                <h3 className="cs-color">Integrity</h3>
                <p>
                  We strongly believe our values drive our organisation and are fundamental in shaping our identity.
                  As such, we will always strive to  remain true to our core values.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <div className="cs-section-title center">
              <strong>
                <Link className={styles.button} to="/donate">
                  Donate Now!
                </Link>
              </strong>
              <strong>
                <Link className={styles.button} to="/get-involved">
                  Join Us!
                </Link>
              </strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}