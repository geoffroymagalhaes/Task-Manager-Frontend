import { useState } from "react";
import Signin from "../components/SignIn";
import Signup from "../components/Signup";

const Auth = ({ handleToken }) => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <>
      <div>
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
