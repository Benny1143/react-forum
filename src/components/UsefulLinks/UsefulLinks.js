import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styles from './UsefulLinks.module.scss';

export default class UsefulLinks extends PureComponent {
  render() {
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>Useful Links</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="cs-section-title center">
                  <h2>USEFUL LINKS</h2>
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
                    <div className={styles.richEditorText}>
                      <h2>Primary School</h2>
                      <strong>PSLE Syllabuses</strong>
                      <p>
                        <a
                          href="https://www.seab.gov.sg/home/examinations/psle/psle-syllabuses-examined-in-2019"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://www.seab.gov.sg/home/examinations/psle/psle-syllabuses-examined-in-2019
                        </a>
                      </p>
                      <h2>Secondary School</h2>
                      <strong>GCE N(T)-Level Syllabuses</strong>
                      <p>
                        <a
                          href="https://www.seab.gov.sg/home/examinations/gce-n(t)-level/2019-gce-n(t)-level-syllabus-for-school-candidates"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://www.seab.gov.sg/home/examinations/gce-n(t)-level/2019-gce-n(t)-level-syllabus-for-school-candidates
                        </a>
                      </p>
                      <strong>GCE N(A)-Level Syllabuses</strong>
                      <p>
                        <a
                          href="https://www.seab.gov.sg/home/examinations/gce-n(a)-level/2019-gce-n(a)-level-syllabus-for-school-candidates"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://www.seab.gov.sg/home/examinations/gce-n(a)-level/2019-gce-n(a)-level-syllabus-for-school-candidates
                        </a>
                      </p>
                      <strong>GCE O-Level Syllabuses</strong>
                      <p>
                        <a
                          href="https://www.seab.gov.sg/home/examinations/gce-o-level/2019-gce-o-level-syllabus-for-school-candidates"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://www.seab.gov.sg/home/examinations/gce-o-level/2019-gce-o-level-syllabus-for-school-candidates
                        </a>
                      </p>
                      <h2>Junior College</h2>
                      <strong>GCE A-Level Syllabuses</strong>
                      <p>
                        <a
                          href="https://www.seab.gov.sg/home/examinations/gce-a-level/2019-gce-a-level-syllabus-for-school-candidates"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://www.seab.gov.sg/home/examinations/gce-a-level/2019-gce-a-level-syllabus-for-school-candidates
                        </a>
                      </p>
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
