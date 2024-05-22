import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

export default class Contact extends PureComponent {
  render() {
    return (
      <div className="main-section">
        <div
          className="page-section"
          style={{ paddingTop: '10px', paddingBottom: '80px' }}
        >
          <div className="container">
            <Helmet>
              <title>Contact Us</title>
            </Helmet>
            <div className="row">
              <div className="section-content col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="cs-contact-form view-two">
                      <div className="cs-section-title">
                        <h2>Contact Form</h2>
                        <p>
                          Your email address will not be published. Required
                          fields are marked.
                        </p>
                      </div>
                      <div className="form-holder">
                        <div className="row">
                          <form
                            action="https://formspree.io/support@smartguppy.com"
                            method="POST"
                          >
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="cs-form-holder">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="input-holder">
                                      <input
                                        type="text"
                                        name="name"
                                        placeholder="Name *"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="cs-form-holder">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="input-holder">
                                      <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address *"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="cs-form-holder">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="input-holder">
                                      <input
                                        type="text"
                                        name="tel"
                                        placeholder="Phone No."
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="cs-form-holder">
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="input-holder">
                                      <input
                                        type="text"
                                        name="_subject"
                                        placeholder="Subject *"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cs-form-holder">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="input-holder">
                                  <textarea
                                    name="text"
                                    placeholder="Text here..."
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-md-12">
                              <div className="cs-field">
                                <div className="cs-btn-submit">
                                  <input
                                    className="cs-bgcolor"
                                    type="submit"
                                    value="Send Message"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <aside className="section-sidebar col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div className="cs-contact-info view-two">
                  <div className="cs-section-title">
                    <h2>Contact Info</h2>
                    <p>Welcome to our Website. We are glad to have you.</p>
                  </div>
                  <ul>
                    <li>
                      <div className="cs-media">
                        {' '}
                        <i className="icon-home cs-color" />{' '}
                      </div>
                      <div className="cs-text">
                        {' '}
                        <span>Address:</span>
                        <p>
                          Golden Mile Complex, 5001 Beach Road #04-12 Singapore
                          199588
                        </p>
                      </div>
                    </li>
                    {/*
                      <li>
                        <div className="cs-media"> <i className="icon-phone cs-color"></i> </div>
                        <div className="cs-text"> <span>Phone No.</span>
                          <p>020 7946 0338</p>
                        </div>
                      </li>
                      <li>
                        <div className="cs-media"> <i className="icon-fax cs-color"></i> </div>
                        <div className="cs-text"> <span>Fax No.</span>
                          <p>44 20 7946 0827</p>
                        </div>
                      </li>
                      <li>
                        <div className="cs-media"> <i className="icon-envelope cs-color"></i> </div>
                        <div className="cs-text"> <span>Email Address</span>
                          <p><a href="mailto:support@smartguppy.com">support@smartguppy.com</a></p>
                        </div>
                      </li>
                    */}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div className="page-section" style={{ height: '392px' }}>
          <div className="cs-maps loader">
            <iframe
              title="Map"
              height="392"
              frameBorder="0"
              allowFullScreen=""
              style={{
                border: '0px none',
                width: '100%',
                pointerEvents: 'none',
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.786770492017!2d103.86275631448562!3d1.3029133620880466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19b37f587369%3A0x2ddd570f5fb84692!2sGolden+Mile+Complex!5e0!3m2!1sen!2ssg!4v1509718058524"
            />
          </div>
        </div>
      </div>
    );
  }
}
