import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Cookies from "js-cookie";

import "./App.css";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  const [token, setToken] = useState(Cookies.get("tasks-user-token") || null);
  const handleToken = (token) => {
    if (token) {
      Cookies.set("tasks-user-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("tasks-user-token");
      setToken(null);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth handleToken={handleToken} />} />
        <Route
          path="/home"
          element={token ? <Home token={token} /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to={token ? "/home" : "/auth"} />} />
      </Routes>
    </Router>
  );
}

export default App;
