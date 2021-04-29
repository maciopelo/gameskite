import React, { useState } from "react";
import Axios from "axios";
import "../styles/loginPage.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    Axios.post("http://localhost:8080/register", {
      email: email,
      nick: nickname,
      password: password,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <h1>Login</h1>
        <label>
          e-mail
          <input placeholder="e-mail" type="email" />
        </label>

        <label>
          password
          <input placeholder="password" type="password" />
        </label>
        <button>Login</button>
      </div>

      <div className="register-panel">
        <h1>Register</h1>
        <label>
          e-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          nickname
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>

        <label>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
