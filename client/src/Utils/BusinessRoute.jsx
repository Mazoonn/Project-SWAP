import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

// handle the private routes
export default function BusinessRoute({
  path,
  component: Component,
  render,
  ...rest
}) {
    const user = getCurrentUser();
    const role = user.role;

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => { 
        if (user && (role === 'business' || role === 'admin')) return Component ? <Component {...props} /> : render(props); 
        return <Redirect to="/" />;
      }}
    />
  );
}
