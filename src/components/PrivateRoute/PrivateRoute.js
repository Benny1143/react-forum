import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  isAuthenticated,
  render,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        render ? (
          render(props)
        ) : (
          <Component {...props} />
        )
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default connect(state => {
  const isAuthenticated = state.auth.user;

  return { isAuthenticated };
})(PrivateRoute);
