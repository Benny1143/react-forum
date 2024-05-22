import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import img1 from '../../assets/img/get-involved-img1.jpg';
import img2 from '../../assets/img/get-involved-img2.jpg';
import img3 from '../../assets/img/get-involved-img3.jpg';
import img4 from '../../assets/img/get-involved-img4.jpg';
import img5 from '../../assets/img/get-involved-img5.jpg';
import { Link } from 'react-router-dom';
import { mapEntityToKeyword } from 'utils/config';
import cx from 'classnames';
import styles from './GetInvolved.module.scss';

export default class GetInvolved extends PureComponent {
  render() {
    return (
      <div className="main-section">
        <div className="page-section">
          <div className="container">
            <Helmet>
              <title>Get Involved</title>
            </Helmet>
            <div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-section-title center">
                  <h2>GET INVOLVED</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-section" style={{ marginBottom: '85px' }}>
          <div className="container">
            <div className="row">
              <div className="section-fullwidtht col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                      <div className="col-md-7">
                        <div>
                          If you are keen to do more to advocate the cause of
                          Open Education,
                          <br />
                          we are definitely looking for you!
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7" style={{ paddingTop: 50 }}>
                        <b style={{ fontSize: 20 }}>IF...</b>
                        <div>
                          <p className={styles.involve}>
                            You believe that there is more to life than just
                            scoring better grades than your peers, that a higher
                            and more meaningful cause of helping others exists.
                          </p>
                          <p
                            className={cx(styles.involve, styles.involveMiddle)}
                          >
                            You believe you can potentially impact and help
                            <br />
                            every student in Singapore succeed.
                          </p>
                          <p className={styles.involve}>
                            You believe that you can change the education
                            <br />
                            culture in Singapore for the better.
                          </p>
                          <br />
                        </div>
                      </div>
                      <div className={cx(styles.img1Container, 'col-md-5')}>
                        <img src={img1} alt="Get Involved" />
                      </div>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center', paddingTop: 50 }}>
                      <b style={{ fontSize: 24 }}>JOIN THE TEAM</b>
                    </div>
                    <div className="cs-section-title center">
                      <strong>
                        <Link
                          to={`/${mapEntityToKeyword('contact')}`}
                          className={styles.button}
                        >
                          Contact Us Now!
                        </Link>
                      </strong>
                      <strong>
                        <Link
                          to={`/${mapEntityToKeyword('our-programmes')}`}
                          className={styles.button}
                        >
                          Our Programmes
                        </Link>
                      </strong>
                    </div>
                    <div className="col-md-6" style={{ paddingTop: 70 }}>
                      <b>HERE&#39;S WHAT OUR STUDENTS AND TUTORS HAVE TO SAY</b>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ paddingBottom: 20, paddingTop: 20 }}
                  >
                    <div className="col-md-6">
                      <div className={cx(styles.imgContainer, 'col-md-6')}>
                        <img src={img2} alt="Get Involved" />
                      </div>
                      <div className="col-md-6">
                        <div>
                          &#34;I look forward to class every Saturday. The
                          tutors are very caring and easy to talk to and have
                          helped me a lot in my studies. I also like the monthly
                          bubble tea sessions which make learning fun, and the
                          learning journey that I can go to.&#34;
                          <br />
                          <i>
                            &#8211;&#8211;Dong Xuan (left), Secondary 4 Student
                          </i>
                        </div>
                      </div>
                    </div>
                    <div
                      className={cx(
                        styles.rocketContainer,
                        'col-md-6 text-center'
                      )}
                    >
                      <img src={img5} height="80" alt="Rocket" />
                    </div>
                  </div>
                  <div
                    className="col-sm-12"
                    style={{ paddingBottom: 20, paddingTop: 20 }}
                  >
                    <div className="row">
                      <div className="col-sm-12 col-md-6 col-md-push-6">
                        <div className="row">
                          <div
                            className={cx(
                              styles.imgContainer,
                              'col-md-6 col-md-push-6'
                            )}
                          >
                            <img src={img4} alt="Get Involved" />
                          </div>
                          <div className="col-md-6 col-md-pull-6">
                            <div>
                              &#34;I feel grateful to be able to share my
                              passion with the students from TOUCH Young Arrow.
                              It was very fullfilling to be able to impart life
                              values through dance and see the students grow
                              throughout LeVel UP.&#34;
                              <br />
                              <i>&#8211;&#8211;Syaidi, LeVel UP Dance Mentor</i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          styles.rocketContainer,
                          'col-md-6 col-md-pull-6 text-center'
                        )}
                      >
                        <img src={img5} height="80" alt="Rocket" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ paddingBottom: 20, paddingTop: 20 }}
                  >
                    <div className="col-md-6">
                      <div
                        className={cx(
                          styles.imgContainer,
                          'col-xs-12 col-md-5'
                        )}
                      >
                        <img src={img3} alt="Get Involved" />
                      </div>
                      <div className="col-md-7">
                        <div>
                          &#34;It is interesting to understand the different
                          needs of every individual. I am happy to share my
                          knowledge and experiences with them!&#34;
                          <br />
                          <i>
                            &#8211;&#8211;Zi Hong, Volunteer Tutor &#38;
                            Coordinator
                          </i>
                        </div>
                      </div>
                    </div>
                    <div
                      className={cx(
                        styles.rocketContainer,
                        'col-md-6 text-center'
                      )}
                    >
                      <img src={img5} height="80" alt="Rocket" />
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
