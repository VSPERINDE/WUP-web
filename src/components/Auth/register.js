import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { Button, Message } from "rsuite";

function RegisterPage() {
  const { authenticated, register, errorMsg, loading } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [showMessageError, setShowMessageError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user, email, password);
    !authenticated ? setShowMessageError(true) : setShowMessageError(false);
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={require("../../assets/logo.png")} alt="" />
      </div>
      <div className="register-form">
        <h1>Registre-se</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome</label>
            <input
              className="control"
              type="text"
              id="nome"
              name="nome"
              value={user}
              onChange={(u) => setUser(u.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              className="control"
              type="password"
              id="senha"
              name="senha"
              value={password}
              onChange={(p) => setPassword(p.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Re-entre a Senha</label>
            <input
              className="control"
              type="password"
              id="repeatedSenha"
              name="repeatedSenha"
              value={repeatedPassword}
              onChange={(p) => setRepeatedPassword(p.target.value)}
            />
          </div>
          <div className="submit-button">
            {showMessageError ? (
              <Message showIcon type="error" header="Error">
                {errorMsg}
              </Message>
            ) : null}
            <Button
              type="submit"
              loading={loading}
              color="yellow"
              size="lg"
              block
            >
              Enviar
            </Button>
          </div>
          <Link to={"/login"}>
            <Button size="lg" block>
              Voltar
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
