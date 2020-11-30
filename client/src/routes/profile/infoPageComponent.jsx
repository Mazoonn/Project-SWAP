import React, { Component } from "react";
import { getClientInfo } from "../../services/client";
import { getCurrentUser } from "../../services/authService";

const infoPageComponent = () => {
  const user = getCurrentUser();
  const client_id = user[`user-id`];
  const data = getClientInfo(client_id);
  const [clientData, setData] = React.useState({ client_id: client_id, ...data });

  return (
    <React.Component>
      <div className="row ml-1">
        <div className="col-">
          <h2>{`Hello ${clientData.first_name} ${clientData.last_name}`}</h2>
        </div>
      </div>
    </React.Component>
  );
};

export default infoPageComponent;
