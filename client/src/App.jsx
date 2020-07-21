import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import NavBar from "./components/navBar";
//import SideBar from "./components/sideBar";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
    </div>
  );
}

export default App;
