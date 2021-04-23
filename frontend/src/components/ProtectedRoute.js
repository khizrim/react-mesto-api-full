import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Preloader from './Preloader';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.isChecking ? (
          <Preloader />
        ) : props.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='./signin' />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
