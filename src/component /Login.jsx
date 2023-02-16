import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formState, setFormState] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  console.log(formState);

  useEffect(() => {
    console.log("Form state changed: ", formState);
    if (!formState) {
      window.localStorage.clear();
      console.log(formState);
    }
  }, [formState]);

  console.log(formState);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Before setFormState: ", formState);
    setFormState(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      const user = data.find(
        (item) => item.email.toLowerCase() === email.toLowerCase()
      );
      console.log(formState);
      setEmail("");
      setPassword("");

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("After setFormState: ", formState);
        navigate("/Albums");
      } else {
        setErrMsg("Your email is incorrect, please try again.");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response.");
      }
      console.log(formState);
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
