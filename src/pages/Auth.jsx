import { useState } from "react";
import Signin from "../components/SignIn";
import Signup from "../components/Signup";

import "../components/SignAuth.css";

const Auth = ({ handleToken }) => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <>
      <div className="auth-container">
        <h1>Task Manager</h1>
        <div>
          <button onClick={() => setIsSignin(true)}>Sign In</button>
          <button onClick={() => setIsSignin(false)}>Sign Up</button>
        </div>
        {isSignin ? (
          <Signin handleToken={handleToken} />
        ) : (
          <Signup setIsSignin={setIsSignin} />
        )}
      </div>
    </>
  );
};
export default Auth;
