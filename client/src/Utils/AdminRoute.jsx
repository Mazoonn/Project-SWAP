import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../services/authService";

// admin routes
export default function AdminRoute({
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
        if (isAdmin()) return Component ? <Component {...props} /> : render(props); 
        return <Redirect to="/" />;
      }}
    />
  );
}
