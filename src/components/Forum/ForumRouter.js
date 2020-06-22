import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Onboarding from './Onboarding/Onboarding';
import Forum from './Forum';

class ForumRouter extends Component {
    static propTypes = { pushState: PropTypes.func.isRequired };

    render() {
        const { match: { url } } = this.props;

        return (
            <Switch>
                {/* <PrivateRoute path={`${url}/onboarding`} component={Onboarding} /> */}
                <Route path={`${url}/onboarding`} component={Onboarding} />
                <Route path={`${url}`} component={Forum} />
            </Switch>
        );
    }
}

export default connect(null, { pushState: push })(ForumRouter);