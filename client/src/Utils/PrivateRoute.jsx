import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./../services/authServie";

// handle the private routes
export default function PrivateRoute({
  path,
  component: Component,
  render,
  ...rest
}) {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}
