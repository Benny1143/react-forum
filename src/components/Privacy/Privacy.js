import React, { Component } from 'react';
import cx from 'classnames';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export default class Privacy extends Component {
  render() {
    const styles = require('./Privacy.scss');
    return (
      <div className="main-section">
        <div className="page-section" style={{ marginBottom: '63px' }}>
          <div className="container">
            <Helmet>
              <title>Privacy Policy</title>
            </Helmet>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className={cx('rich_editor_text', styles.richEditorText)}>
                  <div className="cs-section-title">
                    <h2>PRIVACY POLICY</h2>
                  </div>
                  <p>
                    SmartGuppy is the only Open Education resource sharing
                    website in Singapore, collecting and archiving all forms of
                    education resources where possible . We at SmartGuppy are
                    committed to promulgating and maintaining high standards of
                    professionalism in the spirit of open education and
                    development.
                  </p>
                  <h2>Data Protection Policy</h2>
                  <p>
                    The purpose of this document ("Data Protection Policy") is
                    to inform you on how SmartGuppy (collectively referred to
                    herein as "Organisation", "us", "we" or "our") manages
                    Personal Data which is subject to the Singapore Personal
                    Data Protection Act (No. 26 of 2012) ("the Act"). Please
                    take a moment to read this Data Protection Policy so that
                    you know and understand the purposes for which we collect
                    and use your Personal Data.
                  </p>
                  <p>
                    We also want you to understand the way in which we collect,
                    use, disclose and/or retain your Personal Data.
                  </p>
                  <p>This Personal Data Protection Policy sets out:</p>
                  <ol>
                    <li>our policies on how we manage your Personal Data;</li>
                    <li>
                      the types of Personal Data we collect, use, disclose and/
                      or retain;
                    </li>
                    <li>
                      how we collect, use, disclose and/ or retain your Personal
                      Data; and
                    </li>
                    <li>
                      the purpose(s) for which we collect, use, disclose and/ or
                      retain your Personal Data.
                    </li>
                  </ol>
                  <p>
                    You agree and consent to us, the Organisation, and our
                    authorised service providers and third parties to collect,
                    use and disclose and/ or retain your Personal Data in the
                    manner set forth in this Personal Data Protection Policy.
                  </p>
                  <p>
                    Smart Guppy may from time to time update the Data Protection
                    Policy to ensure that the Data Protection Policy is
                    consistent with our future developments and/or any changes
                    in legal or regulatory requirements. Subject to your rights
                    at law, you agree to be bound by the prevailing terms of the
                    Data Protection Policy as updated from time to time on this
                    page.
                  </p>
                  <p>
                    This Personal Data Protection Policy forms a part of the
                    terms and conditions governing your relationship with us and
                    should be read in conjunction with such terms and conditions
                    (“Terms and Conditions”). In the event of any inconsistency
                    between the provisions of the Personal Data Protection
                    Policy and the Terms and Conditions, the provisions of the
                    Terms and Conditions shall prevail.
                  </p>
                  <h3>1. Your Personal Data</h3>
                  <p>
                    In this Personal Data Protection Policy, “Personal Data”
                    refers to any data and/or information about you from which
                    you can be identified by, either (a) from that data; or (b)
                    from that data and other information to which we may have
                    legitimate access to.
                  </p>
                  <p>
                    Examples of such Personal Data include but are not limited
                    to:
                  </p>
                  <ol>
                    <li>
                      your name, NRIC, passport or other identification number,
                      telephone number(s), mailing address, email address and
                      any other information relating to you which you have
                      provided in any forms you may have submitted to use, or in
                      other forms of interaction with you;
                    </li>
                    <li>your photos;</li>
                    <li>
                      your employment history, education background, and income
                      levels;
                    </li>
                    <li>
                      Personal Data of your family members, such as next of kin,
                      spouses, and children;
                    </li>
                    <li>
                      information relating to payments, such as your bank
                      account number or credit card information;
                    </li>
                    <li>
                      information about your usage of and interaction with our
                      website and/ or services including computer and connection
                      information, device capability, bandwidth, statistics on
                      page views and traffic to and from our website
                    </li>
                  </ol>
                  <h3>2. Collection of your Personal Data</h3>
                  <p>
                    Generally, we may collect your Personal Data through the
                    following ways:
                  </p>
                  <ol>
                    <li>when you sign up with us for membership;</li>
                    <li>
                      when you access our websites or perform an online
                      transaction;
                    </li>
                    <li>
                      when you interact with any of our employees and
                      volunteers;
                    </li>
                    <li>
                      when you submit an application to us for membership
                      services and benefits;
                    </li>
                    <li>
                      when you respond to our request for additional Personal
                      Data;
                    </li>
                    <li>
                      when you ask to be included in an email or other mailing
                      list;
                    </li>
                    <li>when you request that we contact you;</li>
                    <li>
                      when you respond to our initiatives or promotions; and
                    </li>
                    <li>
                      when you submit your Personal Data to us for any other
                      reason.
                    </li>
                  </ol>
                  <p>
                    When you browse our website, you generally do so
                    anonymously, but please see section 6 below on cookies.
                  </p>
                  <h3>
                    3. Purposes for the Collection, Use and Disclosure of Your
                    Personal Data
                  </h3>
                  <p>
                    Generally, we may collect, use, disclose and/ or retain your
                    Personal Data for the following purposes:
                  </p>
                  <ol>
                    <li>
                      to manage your membership including recruitment,
                      processing and termination of your membership;
                    </li>
                    <li>
                      to provide you with membership benefits and services;
                    </li>
                    <li>to provide you with training;</li>
                    <li>to assist you with your enquiries;</li>
                    <li>
                      to process payment for your membership or any other
                      purchases, services and subscriptions;
                    </li>
                    <li>
                      to improve membership/ customer services, such as
                      resolving complaints and handling requests and enquiries;
                    </li>
                    <li>to conduct research, surveys and interviews;</li>
                    <li>to keep you updated on our events; and</li>
                    <li>to comply with applicable laws and regulations.</li>
                  </ol>
                  <h3>4. Marketing / Optional Purposes</h3>
                  <p>
                    From time to time, we may contact you via mail, electronic
                    mail, telephone (call or SMS-Text), facsimile or social
                    medial platforms, to inform you about our membership
                    benefits, services and events that we think may be of
                    interest to you.
                  </p>
                  <p>
                    You can let us know at any time if you no longer wish to
                    receive marketing materials (by informing us through{' '}
                    <Link to="/contact">our contact form</Link>) and we will
                    remove your details from our direct marketing database.
                  </p>
                  <p>
                    Please note that we may still send you non-marketing
                    messages such as surveys, customer-service notices and other
                    service related notices.
                  </p>
                  <h3>5. Disclosure of your Personal Data</h3>
                  <p>
                    We may disclose your Personal Data to the following group of
                    external organisations for purposes mentioned above,
                    subjected to the requirements of applicable laws:
                  </p>
                  <ol>
                    <li>
                      Education related organisations such as the Ministry of
                      Education, schools, libraries etc.
                    </li>
                    <li>
                      a company subjected to a Collective Agreement with us;
                    </li>
                    <li>
                      agents, contractors, data intermediaries or third party
                      service providers who provide services, such as
                      telecommunications, mailing, information technology,
                      payment, payroll, data processing, training, market
                      research, carding, storage and archival, to us;
                    </li>
                    <li>
                      external banks, financial institutions, credit card
                      companies and their respective service providers;
                    </li>
                    <li>our professional advisers such as our auditors;</li>
                    <li>
                      relevant government regulators, statutory boards or
                      authorities or law enforcement agencies to comply with any
                      laws, rules, guidelines and regulations or schemes imposed
                      by any government authority;
                    </li>
                    <li>
                      third party reward, loyalty, privileges and co-branded
                      programme providers;
                    </li>
                    <li>
                      business partners that provides any membership services
                      and benefits; and
                    </li>
                    <li>
                      any other person in connection with the purposes set forth
                      above.
                    </li>
                  </ol>
                  <h3>6. Use of Cookies</h3>
                  <p>
                    We may collect or analyse anonymised information from which
                    individuals cannot be identified (“Aggregate Information”),
                    such as number of users and their frequency of use, the
                    number of page views (or page impressions) that occur on our
                    websites and common entry and exit points into our websites.
                  </p>
                  <p>
                    We make use of “cookies” to store and track Aggregate
                    Information about you when you enter our website(s). Such
                    cookies are used to track information such as the number of
                    users and their frequency of use, profiles of users and
                    their online preferences.
                  </p>
                  <p>
                    Such aggregate Information collected may be used to assist
                    us in analysing the usage of our website(s) so as to improve
                    your online experience with us.
                  </p>
                  <p>
                    Should you wish to disable the cookies associated with these
                    technologies you may do so by changing the setting on your
                    browser. However, please note that this may affect the
                    functionality of the website(s).
                  </p>
                  <h3>7. Third-Party Sites</h3>
                  <p>
                    Our website may contain links to other websites operated by
                    third parties independent of the Organisation. We are not
                    responsible for the privacy practices of such websites
                    operated by third parties even though it is linked to our
                    website(s).
                  </p>
                  <p>
                    We encourage you to learn about the privacy policies of such
                    third party website(s) by checking the policy of each site
                    you visit and contact its owner or operator if you have any
                    concerns or questions.
                  </p>
                  <h3>8. Protection of your Personal Data</h3>
                  <p>
                    We maintain appropriate security safeguards and practices to
                    protect your Personal Data unauthorised access, collection,
                    use, disclosure, copying, modification disposal or similar
                    risks, in accordance with applicable laws.
                  </p>
                  <h3>9. Accuracy of your Personal Data</h3>
                  <p>
                    We take all reasonable measures to ensure that your Personal
                    Data remains accurate, complete and up-to-date.
                  </p>
                  <p>
                    You may also keep us informed when there are any updates to
                    your Personal Data by contacting us directly.
                  </p>
                  <h3>10. Withdrawal of Consent</h3>
                  <p>
                    If you wish to withdraw your consent to any use or
                    disclosure of your Personal Data as set out in this Personal
                    Data Protection Policy, you may contact us via{' '}
                    <Link to="/contact">our contact form</Link>
                  </p>
                  <p>
                    Please note that if you withdraw your consent to any or all
                    use or disclosure of your Personal Data, depending on the
                    nature of your request, we may no longer be in a position to
                    continue to provide membership benefits and services to you.
                  </p>
                  <p>
                    Such a withdrawal may therefore result in the termination of
                    any membership that you may have with us.
                  </p>
                  <h3>11. Access and Correction of your Personal Data</h3>
                  <p>
                    You may request access to or make corrections to your
                    Personal Data records through the following channels:
                  </p>
                  <ol>
                    <li>
                      <Link to="/contact">Our contact form</Link>
                    </li>
                  </ol>
                  <h3>12. Contacting Us</h3>
                  <p>
                    If you have any questions or complaints relating to the use
                    or disclosure of your Personal Data, or if you wish to know
                    more about our data protection policies and practices,
                    please contact us via{' '}
                    <Link to="/contact">our contact form</Link>.
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
