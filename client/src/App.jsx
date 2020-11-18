import React from "react";
import NavBar from "./components/navBar";
import getCurrentUser from "./services/authService";

function App() {
  const [currentUser, setUser] = React.useState(null);
  React.useEffect(() => {
    setUser(getCurrentUser());
  }, [setUser]);
  return (
    <div className="App">
      <NavBar user={currentUser}></NavBar>
    </div>
  );
}

export default App;
