import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Helmet from 'react-helmet';
import imgDanceProg from 'assets/img/programmes-danceprog.jpg';
import imgTuitionProg from 'assets/img/programmes-tuitionprog.jpg';
import imgFoodTour from 'assets/img/programmes-foodtour2019.jpg';

export default class Programmes extends PureComponent {
  render() {
    const styles = require('./Programmes.module.scss');
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '20px' }}>
          <div className="container">
            <Helmet>
              <title>Our Programmes</title>
            </Helmet>
            <div className="row">
              <aside className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="cs-section-title center">
                  <h2>OUR PROGRAMMES</h2>
                  <p>
                    We have partnered with a number of organisations to create
                    various exciting programmes by taking a holistic approach to
                    developing students, not just academically but also in
                    helping them build character and strengthening their belief
                    in themselves. Did we mention our programmes are free?{' '}
                  </p>
                </div>
              </aside>
              <div className={styles.programmeSection}>
                <div className={cx(styles.img, 'col-sm-12 col-xs-12')}>
                  <figure>
                    <img src={imgDanceProg} alt="dance" />
                  </figure>
                </div>
                <div className={styles.eventTitle}>
                  <span>EMPOWERMENT</span>
                </div>
                <div className={cx(styles.eventText, 'col-sm-12 col-xs-12')}>
                  <h4 className={cx(styles.descriptionTitle)}>
                    LeVeL UP Dance! (Life Values Learning and Understanding
                    Programme)
                  </h4>
                  <p>
                    Can’t dance? Don’t fret!
                    <br />
                    LeVeL UP is our dance programme endorsed by the National
                    Youth Council(NYC) and supported by the National Volunteer
                    and Philantropy Centre(NVPC). It is taught by experienced
                    volunteer dancers, of which some of the dance mentors are
                    actually graduates of this programme! <br />
                    This is unlike your usual dance program. <br />
                    By using the power of dance, we hope to inculcate various
                    important life values to our participants, such as Courage,
                    Self-Belief, Empathy and Honesty. Through this, we hope that
                    participants will benefit in other aspects as well, both in
                    their daily lives as well as in their academic journeys.{' '}
                    <br />
                    <br />
                    Let’s dance! <br />
                  </p>
                </div>
              </div>
              <div className={styles.programmeSection}>
                <div className={cx(styles.img, 'col-sm-12 col-xs-12')}>
                  <figure>
                    <img src={imgTuitionProg} alt="tuition" />
                  </figure>
                </div>
                <div className={styles.eventTitle}>
                  <span>ACADEMIC</span>
                </div>
                <div className={cx(styles.eventText, 'col-sm-12 col-xs-12')}>
                  <h3 className={styles.descriptionTitle}>
                    Eunos CC SmartGuppy <br />
                    Free Tuition Programme
                  </h3>
                  <p>
                    Nestled in a cosy classroom in a community centre, we
                    provide free tuition to students across all educational
                    backgrounds on a weekly basis.
                    <br />
                    Besides studying hard, we also play hard!
                    <br />
                    <br />
                    Every month, we have bubble tea sessions. On top of that,
                    outings, movies, and pizza parties are held during the
                    holidays for our students to have fun. Any primary or
                    secondary school students facing difficulties with their
                    school work are welcome to attend. We do not impose any
                    criteria or fees to join.
                    <br />
                    <br />
                    Our classes are held every Saturday from 1pm to 3pm at Eunos
                    Community Club.
                    <br />
                  </p>
                </div>
              </div>
              <div className={styles.programmeSection}>
                <div className={cx(styles.img, 'col-sm-12 col-xs-12')}>
                  <figure>
                    <img src={imgFoodTour} alt="foodtour" />
                  </figure>
                </div>
                <div className={styles.eventTitle}>
                  <span>OUTREACH</span>
                </div>
                <div className={cx(styles.eventText, 'col-sm-12 col-xs-12')}>
                  <h3 className={styles.descriptionTitle}>
                    National Day Food Tour <br />
                    SmartGuppy x Eunos CC
                  </h3>
                  <p>
                    In August, we held a food tour in conjunction with Eunos
                    Community Centre in order to celebrate Singapore’s 54th
                    birthday. We brought a total of 45 participants, comprising
                    of youths and their families to popular hawker centres in
                    Toa Payoh. <br />
                    <br />
                    In line with our values of open education, not only did we
                    enlighten participants on the history of our local food and
                    view it in a new light, but we also spread awareness of our
                    mission in making education accessible to every student
                    regardless of their background. <br />
                    <br />
                    We also had the opportunity to bond the community in a fun,
                    SmartGuppy way!
                    <br />
                    <br />
                    Everyone was given a SmartGuppy Tour de Food tote bag with
                    reusable utensils, food and biscuit zines, and a food tour
                    map inside before embarking to our first destination. <br />
                    <br />
                    With food pitstops at Lorong 1, Lorong 5, and finally ending
                    at Gourmet Paradise at HDB Hub, participants tasted many of
                    our local foods from Hokkien fried prawn mee, to dim sum, to
                    murtabak and many more. 
                    <br />
                    <br />
                    The tour ended off with a traditional biscuit ceremony with
                    each participant receiving a goodie bag of snacks from the
                    past! Everyone had the opportunity to eat and explore the
                    huge assortment of traditional snacks that we brought in,
                    such as jewels, spice cookies, almond cookies, fish biscuits
                    and much more!
                  </p>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="cs-section-title center">
                  <p style={{ fontSize: '18px' }}>
                    <strong>
                      Interested in joining our Programmes? Or helping out as a
                      volunteer!
                    </strong>
                  </p>
                  <strong>
                    <Link className={styles.button} to="/contact">
                      Contact Us Now!
                    </Link>
                  </strong>
                  <strong>
                    <Link className={styles.button} to="/get-involved">
                      Find Out More!
                    </Link>
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
