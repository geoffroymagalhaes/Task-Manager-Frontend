import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        email: email,
        password: password,
      });
      console.log(response.data.accessToken);
      handleToken(response.data.accessToken);
      navigate("/home");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <main>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Adresse email"
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
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="Se connecter" />
      </form>
    </main>
  );
};

export default Signin;
