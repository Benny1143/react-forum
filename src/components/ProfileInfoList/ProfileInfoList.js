import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { CounterButton, GithubButton } from '..';
// import config from '../../config';
// import Helmet from 'react-helmet';
// import { list as listResources } from 'redux/modules/resources';
import { mapValueToName, mapValuesToNames } from 'utils/config';
import { isTutor } from 'utils/user';

const ProfileInfoList = ({ config, user }) => (
  <div className="cs-author-info-list">
    <ul>
      {user && user.role && (
        <li>
          <i className="icon-user2 cs-color" />
          <span>
            Role
            <em>{config && mapValueToName(config.roles, user.role)}</em>
          </span>
        </li>
      )}
      {/*
        <li>
          <i className="icon-uniF122 cs-color"></i>
          <span>
           Phone
            <em>(800)-470-865-5060</em>
          </span>
        </li>
      */}
      {user && user.email && (
        <li>
          <i className="icon-uniF113 cs-color" />
          <span>
            Email
            <em>{user.email}</em>
          </span>
        </li>
      )}
      {user && user.age !== undefined && (
        <li>
          <i className="icon-hour-glass cs-color" />
          <span>
            Age
            <em>{user.age}</em>
          </span>
        </li>
      )}
      {/*
        <li>
         <i className="icon-uniF10A cs-color"></i>
          <span>
           Specialist in
            <em>Musical Instruments</em>
          </span>
        </li>
      */}
      {user && isTutor(user) && user.tutor && user.tutor.qualification && (
        <li>
          <i className="icon-school cs-color" />
          <span>
            Highest Qualification
            <em>
              {config &&
                mapValueToName(config.qualifications, user.tutor.qualification)}
            </em>
          </span>
        </li>
      )}
      {user &&
        isTutor(user) &&
        user.tutor &&
        user.tutor.experience !== undefined && (
          <li>
            <i className="icon-uniF10A cs-color" />
            <span>
              Experience
              <em>{user.tutor.experience} years</em>
            </span>
          </li>
        )}
      {user &&
        isTutor(user) &&
        user.tutor &&
        user.tutor.teachingSubjects &&
        !!user.tutor.teachingSubjects.length && (
          <li>
            <i className="icon-open-book cs-color" />
            <span>
              Teaching Subjects
              <em>
                {config &&
                  mapValuesToNames(
                    config.subjects,
                    user.tutor.teachingSubjects
                  ).join(', ')}
              </em>
            </span>
          </li>
        )}
      {user && isTutor(user) && user.tutor && user.tutor.minFee !== undefined && (
        <li>
          <i className="icon-coin-dollar cs-color" />
          <span>
            Minimum Fee
            <em>${user.tutor.minFee}/hr</em>
          </span>
        </li>
      )}
      {user && isTutor(user) && user.tutor && user.tutor.basis && (
        <li>
          <i className="icon-watch_later cs-color" />
          <span>
            Tutoring Basis
            <em>{config && mapValueToName(config.basis, user.tutor.basis)}</em>
          </span>
        </li>
      )}
      {user && isTutor(user) && user.tutor && user.tutor.status && (
        <li>
          <i className="icon-assignment_ind cs-color" />
          <span>
            Status
            <em>
              {config &&
                mapValueToName(config.tutorStatuses, user.tutor.status)}
            </em>
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default ProfileInfoList;
