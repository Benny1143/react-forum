import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

const rocketDiagram = require('../../assets/img/donate-rocket-diagram.png');
const rocketSimple = require('../../assets/img/donate-rocket-simple.png');
const donateQr = require('../../assets/img/donation-Qrcode.png');
const giveasiaLogo = require('../../assets/img/giveasia-logo.png');

export default class Donate extends PureComponent {
  render() {
    const styles = require('./Donate.module.scss');
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>Donate</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-section-title center">
                  <h2>DONATE</h2>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginBottom: '63px' }}>
              <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="center">
                  <h3>The Class Rocket</h3>
                  <img src={rocketDiagram} alt="rocket diagram" width="400px" />
                </div>
              </div>
              <div
                className="col-lg-8 col-md-12 col-sm-12"
                style={{ padding: '5% 10%' }}
              >
                <div className="center">
                  <p className={styles.quoteText}>
                    Education is supposed to empower and lift the lives of
                    everyone but it seems that not everyone benefits equally.
                    Some get left behind.
                  </p>
                  <hr className={styles.quoteDivider} />
                  <p className={styles.quoteText}>
                    Unlike most other educational websites, we intend to keep
                    every single note, worksheet, test and exam paper free now
                    and forever, always through the spirit of sharing.
                  </p>
                  <hr className={styles.quoteDivider} />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title center">
                <p style={{ fontSize: '24px' }}>
                  <strong>Help Empower Students!</strong>
                </p>
                <img src={donateQr} alt="donate qr" width="220px" />
                <p>Donate via PayNow!</p>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="cs-section-title center">
                <a
                  href="https://give.asia/smartguppy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.blueButton}
                >
                  <strong>
                    Donate via{' '}
                    <img src={giveasiaLogo} alt="Give Asia" width="100px" />
                  </strong>
                </a>
                <p>Donate via credit card</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-section-title center">
                  <br />
                  <p>
                    By contributing to SmartGuppy, you are helping to sustain us
                    in this crucial period as we seek in our mission to be the
                    largest open and free database of educational resources in
                    Singapore, helping and empowering as many students as we can
                    in the process.
                  </p>
                  <img src={rocketSimple} alt="rocket simple" width="50px" />
                  <p>
                    SmartGuppy relies on the continuous commitment of a very
                    small team of dedicated people and an ever-growing community
                    of kind-hearted educators and students who passionately
                    believe in sharing whatever resources they have at their
                    hands.
                  </p>
                  <img src={rocketSimple} alt="rocket simple" width="50px" />
                  <p>
                    Your donations will enable us to grow this community of
                    sharers, further spread the cause for free and open
                    education, level the playing field, reduce the educational
                    inequality and create a society where every student,
                    regardless of being rich or poor, has the right to have
                    access to as much educational resources as possible.
                  </p>
                  <br />
                  <p>
                    Together, let us build the largest free database of
                    educational resources in Singapore, helping and empowering
                    as many students as we can!
                  </p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-column-text">
                    <div
                      className="call-actions cs-bgcolor"
                      style={{ padding: '25px 35px' }}
                    >
                      <div className="cell icon">
                        <i className="icon-mood" />
                      </div>
                      <div
                        className="cell heading"
                        style={{ marginRight: '13%' }}
                      >
                        <h5>Help us with our fund-raising</h5>
                        <p>
                          We aim to empower underprivileged students and help
                          them succeed!
                        </p>
                      </div>
                      <div className="cell cell-btn">
                        <a
                          href="https://give.asia/smartguppy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="information-btn"
                          style={{ color: 'white' }}
                        >
                          Donate Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
