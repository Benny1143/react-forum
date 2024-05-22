import React, { PureComponent } from 'react';
import cx from 'classnames';
import Helmet from 'react-helmet';
import styles from './Terms.module.scss';

export default class Terms extends PureComponent {
  render() {
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>Terms Of Use</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className={cx('rich_editor_text', styles.richEditorText)}>
                  <div className="cs-section-title">
                    <h2>TERMS OF USE ("Terms")</h2>
                  </div>
                  <p>Last updated: 26 April 2017</p>
                  <p>
                    Please read these Terms and Conditions ("Terms", "Terms and
                    Conditions") carefully before using
                    https://www.smartguppy.com website (the "Service") operated
                    by SmartGuppy (collectively referred to herein as
                    “smartguppy.com”, “us”, “we” or “our”).
                  </p>
                  <p>
                    Your access to and use of the Service is conditioned on your
                    acceptance of and compliance with these Terms. These Terms
                    apply to all visitors, users and others who access or use
                    the Service.
                  </p>
                  <p>
                    The following sets out the terms and conditions
                    ("Agreement") upon which (the "Contributor") will contribute
                    article(s) and his/her article(s), name, photograph(s),
                    quotes, post(s), video(s) and other relevant assets
                    ("Article") for smartguppy.com website and/or its
                    affiliates.
                  </p>
                  <h3>1. Usage</h3>
                  <p>
                    1.1. The Contributor hereby grants Smart Guppy and its
                    affiliates, agents, contractors, successors and assigns
                    (including, without limitation, its advertising agency) the
                    right to use, in perpetuity, his/her article(s), name,
                    photograph(s), post(s), video(s) and other relevant assets
                    in connection with the promotion of Smart Guppy’s business
                    generally (including, without limitation, Smart Guppy’s
                    products and services) ("Usage Rights").
                  </p>
                  <p>
                    1.2. For the avoidance of doubt, the Contributor agrees and
                    acknowledges that smartguppy.com and its affiliates, agents,
                    contractors, successors and assigns (including, without
                    limitation, its advertising agency) shall be entitled to use
                    any part or all of the Article for the promotion of
                    smartguppy.com's business generally (including, without
                    limitation, smartguppy.com's products and services) in all
                    such media as Smart Guppy may reasonably deem fit.
                  </p>
                  <p>
                    Some examples include, but are not limited to,
                    advertisements (such as those in direct mailers to
                    customers, in brochures/flyers to the general public, on the
                    internet, on TV and cable, in newspapers and magazines, on
                    billboards, and on taxis and buses), internal publications
                    (such as internal newsletters) and presentations (such as
                    internal training materials), external publications (such as
                    annual reports and educational materials for the general
                    public) and presentations (such as presentations to
                    customers or authorities), exhibitions, and trade shows.
                  </p>
                  <p>
                    1.3. The Contributor further agrees and acknowledges that
                    Smart Guppy's Usage Rights extends to all countries in which
                    Smart Guppy and its affiliates do business, including but
                    not limited to, Singapore.
                  </p>
                  <h3>2. Liability</h3>
                  <p>
                    2.1. The Contributor hereby releases and agrees to hold
                    Smart Guppy and its affiliates, agents, contractors,
                    successors and assigns (including, without limitation, its
                    advertising agency), harmless from any claim or liability in
                    connection with or arising out of infringement of
                    intellectual property rights belonging to a third party
                    which the Contributor has used in his/her Article without
                    permission.
                  </p>
                  <p>
                    2.2. The Contributor hereby affirms that all materials
                    provided in the Article covered in this release are given
                    without force, coercion, or threat whatsoever, and were
                    provided freely by the Contributor with his/her full
                    consent. The Contributor further agrees to hold blameless
                    and free of all accusation of such force or coercion Smart
                    Guppy, its affiliates, agents, contractors, successors and
                    assigns (including, without limitation, its advertising
                    agency).
                  </p>
                  <h3>3. Miscellaneous</h3>
                  <p>
                    3.1. This Agreement shall be governed by the laws of
                    Singapore and any disputes arising out of or in connection
                    with the same shall be subject to the exclusive jurisdiction
                    of the Courts of Singapore.
                  </p>
                  <p>
                    3.2. If any one or more of the provisions contained in this
                    Agreement shall be invalid, illegal or unenforceable in any
                    respect under any applicable law, the validity, legality or
                    enforceability of the remaining provisions contained herein
                    shall not in any way be affected or impaired.
                  </p>
                  <p>3.3. Article may be edited for accuracy.</p>
                  <p>
                    3.4 While care has been taken to ensure that information
                    contained in the website is true and correct at the time of
                    publication, changes in circumstances after the time of
                    publication may impact on the accuracy of this information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
