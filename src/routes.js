import "./styles.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Agendamentos from "./pages/agendamentos";
import Clientes from "./pages/clientes";
import Colaboradores from "./pages/colaboradores";
import Servicos from "./pages/servicos";
import Horarios from "./pages/horarios";
import Salas from "./pages/salas";

const Routes = () => {
  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row h-100">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/" exact Component={Agendamentos} />
              <Route path="/clientes" Component={Clientes} />
              <Route path="/colaboradores" Component={Colaboradores} />
              <Route path="/servicos" Component={Servicos} />
              <Route path="/horarios" Component={Horarios} />
              <Route path="/salas" Component={Salas} />
            </Switch>
          </Router>
        </div>
      </div>
    </>
  );
};

export default Routes;
