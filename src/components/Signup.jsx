import { useState } from "react";
import axios from "axios";

const Signup = ({ setIsSignin }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const response = await axios.post("http://localhost:3000/auth/signup", {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      });
      //   console.log("===> la réponse" , response.data);
      setIsSignin("true");
    } catch (error) {
      //   console.log(error);
      //   console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="sign-in-up">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Nom"
          name="lastname"
          value={lastname}
          onChange={(event) => {
            setLastname(event.target.value);
          }}
        />
        <input
          required
          type="text"
          placeholder="Prénom"
          name="firstname"
          value={firstname}
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          required
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <input type="submit" value="S'inscrire" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;
