import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { Button } from "rsuite";

const Login = () => {
  const { authenticated, login, errorMsg, loading } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [showMessageError, setShowMessageError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user, password);
    setTimeout(() => {
      !authenticated ? setShowMessageError(true) : setShowMessageError(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={require("../../assets/logo.png")} alt="" />
      </div>
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="control"
              placeholder="Digite seu email de acesso"
              type="email"
              id="email"
              name="email"
              autoComplete="on"
              value={user}
              onChange={(u) => setUser(u.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="control"
              type="password"
              placeholder="Digite a sua senha"
              id="senha"
              name="senha"
              value={password}
              onChange={(p) => setPassword(p.target.value)}
            />
          </div>
          <div className="submit-button">
            <Button
              type="submit"
              loading={loading}
              color="yellow"
              size="lg"
              block
            >
              Entrar
            </Button>
          </div>
        </form>
        <h3>Não tem acesso ainda?</h3>
        <Link className="link" to={"/register"}>
          Registre-se
        </Link>
        {showMessageError ? (alert(errorMsg), window.location.reload()) : null}
      </div>
    </div>
  );
};

export default Login;
