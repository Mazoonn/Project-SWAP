import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

// business owner routes
export default function BusinessRoute({ path, component: Component, render, ...rest }) {
  const user = getCurrentUser();
  let role;
  if (user) role = user.role;
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (user && (role === "business" || role === "admin")) return Component ? <Component {...props} /> : render(props);
        return <Redirect to="/" />;
      }}
    />
  );
}
