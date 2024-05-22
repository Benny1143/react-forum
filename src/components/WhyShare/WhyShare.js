import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { mapEntityToKeyword } from 'utils/config';
import styles from './WhyShare.module.scss';
import PropTypes from 'prop-types';
import { show as showSignupModal } from 'redux/modules/modals/signup';
import { show as showLoginModal } from 'redux/modules/modals/login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';

class WhyShare extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    showSignupModal: PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired,
  };

  handleShowSignupModal = event => {
    event.preventDefault();
    this.props.showSignupModal();
  };

  handleShowLoginModal = event => {
    event.preventDefault();
    this.props.showLoginModal();
  };

  render() {
    const { user } = this.props;
    return (
      <div className={styles.pcenter}>
        <div className="main-section">
          <div className="page-section" style={{ marginBottom: '50px' }}>
            <div className="container">
              <Helmet>
                <title>Why share?</title>
              </Helmet>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-section-title center">
                    <h2 style={{ marginBottom: 30, paddingBottom: 70 }}>
                      WHY SHARE?
                    </h2>
                    <div className={styles.bor}>
                      <div>
                        <b>
                          <p style={{ fontSize: 28 }}>
                            When we share, we all improve, from the
                            <br />
                            true exchange of knowledge and ideas.
                          </p>
                          <footer>- Israeli proverb</footer>
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-section" style={{ marginBottom: '100px' }}>
            <div className={cx(styles.para, 'container col-lg-6')}>
              <p>
                Singapore has a world class education system yet educational
                inequality still exists. Students who come from richer families
                will tend to have more educational resources to improve, while
                the poorer but no less deserving ones will be disadvantaged.
                This starts even before Primary 1. We intend to level the
                playing field and give every student an equal opportunity to
                succeed.
              </p>
              <p className={styles.box}>
                This is our way of giving it back, one small note,
                <br />
                one single worksheet, one paper at a time!
              </p>
              <p style={{ paddingTop: 20 }}>
                With you helping us to share something freely, you will not just
                see how many students you have helped, but you will also play an
                important role in building our budding community of kind-hearted
                student and teacher sharers, making the culture of sharing a
                reality in Singapore.
              </p>
              <p>
                <b>
                  Share a note to get 20 points, build your followers and help
                  as many students now!
                </b>
              </p>
              <div className={styles.contributeButton}>
                {user && (
                  <Link to={`/${mapEntityToKeyword('resources')}/add`}>
                    <div>
                      <img
                        src={require('../Home/resources-junior-college.png')}
                        height="80"
                        alt="CONTRIBUTE NOW"
                      />
                    </div>
                    CONTRIBUTE NOW
                  </Link>
                )}
                {!user && (
                  <a href="Contribute now" onClick={this.handleShowSignupModal}>
                    <div>
                      <img
                        src={require('../Home/resources-junior-college.png')}
                        height="80"
                        alt="CONTRIBUTE NOW"
                      />
                    </div>
                    CONTRIBUTE NOW
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const {
      entities: { users },
    } = state;

    const user = state.auth.user && users[state.auth.user];

    return {
      user,
    };
  },
  dispatch => bindActionCreators({ showSignupModal, showLoginModal }, dispatch)
)(WhyShare);
