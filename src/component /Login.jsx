import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formState, setFormState] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (!formState) {
      window.localStorage.clear();
    }
  }, [formState]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState(true);

    try {
      const response = await axios.get(
        "/users"
      );
      const data = response.data;
      const user = data.find(
        (item) => item.email.toLowerCase() === email.toLowerCase()
      );

      setEmail("");
      setPassword("");

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/Albums");
      } else {
        setErrMsg("Your email is incorrect, please try again.");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response.");
      }
    }
  };

  return (
    <main className={classes.loginMain}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="Enter your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        <button type="submit">Login</button>
        <p>{errMsg}</p>
      </form>
    </main>
  );
};

export default Login;
