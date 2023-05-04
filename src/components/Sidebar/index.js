import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = ({ location }) => {
  location = useLocation();
  return (
    <sidebar className="col-2 h-100">
      <img src={logo} className="img-fluid px43 py-4" alt="" />
      <ul className="p-0 m-0">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <span className="mdi mdi-calendar-check"></span>
            <text>Agendamentos</text>
          </Link>
        </li>
        <li>
          <Link
            to="/clientes"
            className={location.pathname === "/clientes" ? "active" : ""}
          >
            <span className="mdi mdi-account-multiple"></span>
            <text>Clientes</text>
          </Link>
        </li>
        <li>
          <Link
            to="/colaboradores"
            className={location.pathname === "/colaboradores" ? "active" : ""}
          >
            <span className="mdi mdi-card-account-details-outline"></span>
            <text>Colaboradores</text>
          </Link>
        </li>
        <li>
          <Link
            to="/servicos"
            className={location.pathname === "/servicos" ? "active" : ""}
          >
            <span className="mdi mdi-auto-fix"></span>
            <text>Serviços</text>
          </Link>
        </li>
        <li>
          <Link
            to="/horarios"
            className={location.pathname === "/horarios" ? "active" : ""}
          >
            <span className="mdi mdi-clock-check-outline"></span>
            <text>Horários</text>
          </Link>
        </li>
        <li>
          <Link
            to="/salas"
            className={location.pathname === "/salas" ? "active" : ""}
          >
            <span className="mdi mdi-table-chair"></span>
            <text>Salas</text>
          </Link>
        </li>
      </ul>
    </sidebar>
  );
};

export default Sidebar;
