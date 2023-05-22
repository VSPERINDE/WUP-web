import "./styles.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import Agendamentos from "./pages/agendamentos";
import Clientes from "./pages/clientes";
import Colaboradores from "./pages/colaboradores";
import Servicos from "./pages/servicos";
import Horarios from "./pages/horarios";
import Salas from "./pages/salas";
import Login from "./components/Auth/login";
import RegisterPage from "./components/Auth/register";
import { AuthProvider, AuthContext } from "./components/Auth/auth.context";

const Routes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" exact Component={Login} />
            <Route path="/register" exact Component={RegisterPage} />
            <Route
              path="/"
              exact
              element={
                <Private>
                  <Agendamentos />
                </Private>
              }
            />
            <Route
              path="/clientes"
              element={
                <Private>
                  <Clientes />
                </Private>
              }
            />
            <Route
              path="/colaboradores"
              element={
                <Private>
                  <Colaboradores />
                </Private>
              }
            />
            <Route
              path="/servicos"
              element={
                <Private>
                  <Servicos />
                </Private>
              }
            />
            <Route
              path="/horarios"
              element={
                <Private>
                  <Horarios />
                </Private>
              }
            />
            <Route
              path="/salas"
              element={
                <Private>
                  <Salas />
                </Private>
              }
            />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
};

export default Routes;
