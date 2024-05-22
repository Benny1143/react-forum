import React from 'react';
import Slider from 'react-slick';
import styles from './Partners.module.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const image1 = require('./scape.png');
const image2 = require('./nus.png');
const image3 = require('./dbs.png');

const Partners = () => (
  <div
    className="page-section"
    style={{ background: '#fff', paddingBottom: '20px' }}
  >
    <div className="container">
      <div className="row">
        <div className={styles.partners}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="cs-fancy-heading">
              <h6 className={styles.header}>Our Partners</h6>
            </div>
          </div>
          <div className={styles.partnersList}>
            <Slider
              dots={false}
              speed={1000}
              infinite
              autoplay
              slidesToShow={1}
              slidesToScroll={1}
              arrows
              responsive={[
                {
                  breakpoint: 479,
                  settings: {
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 100000,
                  settings: {
                    slidesToShow: 3,
                    autoplay: false,
                    draggable: false,
                  },
                },
              ]}
            >
              <div className={styles.partnersLogo}>
                <img src={image1} alt="Scape" />
              </div>
              <div className={styles.partnersLogo}>
                <img src={image2} alt="NUS Enterprise" />
              </div>
              <div className={styles.partnersLogo}>
                <img src={image3} alt="DBS" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Partners;
