// informações globais
import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createSession, registerSession } from "../../services/api";

export const AuthContext = createContext(); // cria um contexto global para aplicação

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // impedir aplicação perder o login ao dar refresh:
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await createSession(email, password);
      const loggedUser = response.data;
      const token = loggedUser?._id;
      localStorage.setItem("user", JSON.stringify(loggedUser.email));
      localStorage.setItem("token", token);
      setUser(loggedUser.email);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(
        error?.response?.data?.error || "ocorreu um erro ao tentar fazer login"
      );
    } finally {
      setLoading(false);
    }
  };

  // informações provisorias para adminstração do frontend
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    navigate("/login");
  };

  const register = async (nome, email, password) => {
    try {
      setLoading(true);
      const response = await registerSession(nome, email, password);
      const registeredUser = response.data;
      console.log(registeredUser);
      const token = registeredUser?._id;
      localStorage.setItem("user", JSON.stringify(registeredUser.email));
      localStorage.setItem("token", token);

      setUser(registeredUser.email);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(
        error?.response?.data?.error || "ocorreu um erro ao tentar fazer login"
      );
    } finally {
      setLoading(false);
    }
  };

  //user != null authenticated = true
  //user == null authenticated = false
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        register,
        errorMsg,
      }} // sinal !!user => cast for boolean == boolean()
    >
      {children}
    </AuthContext.Provider>
  );
};
