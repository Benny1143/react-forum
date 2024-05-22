import PropTypes from 'prop-types';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ShareFacebookButton from '../ShareFacebookButton/ShareFacebookButton';
import ShareTwitterButton from '../ShareTwitterButton/ShareTwitterButton';
import ShareGoogleButton from '../ShareGoogleButton/ShareGoogleButton';

const ShareButton = ({ appId }) => {
  // const styles = require('./ShareButton.scss');
  return (
    <Dropdown id="share-dropdown">
      <Dropdown.Toggle className="share-btn" noCaret>
        <i className="icon-share3" />
        Share
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="cs-social-media" style={{ margin: '0 5px' }}>
          <ul>
            {appId && (
              <li>
                <ShareFacebookButton appId={appId} />
              </li>
            )}
            <li>
              <ShareTwitterButton />
            </li>
            <li>
              <ShareGoogleButton />
            </li>
          </ul>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ShareButton.propTypes = {
  appId: PropTypes.string,
};

export default ShareButton;
