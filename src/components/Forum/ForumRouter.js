import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Onboarding from './Onboarding/Onboarding';
import Forum from './Forum';

class ForumRouter extends Component {
    render() {
        const { match: { url } } = this.props;
        return (
            <Switch>
                {/* <PrivateRoute path={`${url}/onboarding`} component={Onboarding} /> */}
                <Route path={`${url}/onboarding`} component={Onboarding} />
                <Route path={`${url}/:to`} component={Forum} />
                <Route path={`${url}`} component={Forum} />
            </Switch>
        );
    }
}

export default ForumRouter;