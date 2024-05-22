import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
// import Helmet from 'react-helmet';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
// import { list as listResources } from 'redux/modules/resources';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ResourcesList from '../ResourcesList/ResourcesList';
import ResourcesAdd from '../ResourcesAdd/ResourcesAdd';
import ResourcesEdit from '../ResourcesEdit/ResourcesEdit';
import { push } from 'connected-react-router';
import { mapEntityToKeyword } from 'utils/config';

class Resources extends Component {
  static propTypes = {
    user: PropTypes.object,
    config: PropTypes.object,
    match: PropTypes.object,
    // logout: PropTypes.func.isRequired,
    // listResources: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  componentDidMount() {
    // this.props.listResources();
  }

  verifyResourceMainLevel = mainLevel => {
    const {
      config: {
        dataByValue: { mainLevels },
      },
    } = this.props;
    return !!mainLevels[mainLevel];
  };

  render() {
    // const {user} = this.props;
    const {
      config,
      match: { url },
    } = this.props;
    const styles = require('./Resources.scss');

    return (
      <div className={styles.resources}>
        <div className={styles.resourcesContent}>
          {config && config.dataByValue && config.dataByValue.mainLevels && (
            <Switch>
              <Route path={`${url}/list`} component={ResourcesList} />
              <PrivateRoute path={`${url}/add`} component={ResourcesAdd} />
              <PrivateRoute
                path={`${url}/edit/:resourceId`}
                component={ResourcesEdit}
              />
              <Route
                path={`${url}/:mainLevel`}
                render={props =>
                  this.verifyResourceMainLevel(props.match.params.mainLevel) ? (
                    <ResourcesList {...props} />
                  ) : (
                    <Redirect
                      to={{
                        pathname: `/${mapEntityToKeyword('resources')}/list`,
                        state: { from: this.props.location },
                      }}
                    />
                  )
                }
              />
              <Redirect to={`${url}/list`} />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    const {
      config,
      entities: { users },
    } = state;
    const { match } = ownProps;

    const user = state.auth.user && users[state.auth.user];

    return { user, config, match };
  },
  { /* listResources, */ pushState: push }
)(Resources);
