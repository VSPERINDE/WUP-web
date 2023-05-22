import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Auth/auth.context";
import { getInfoWorkplace } from "../../services/api";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const [infoWorkplace, setInfoWorkplace] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const recoveredUser = localStorage.getItem("token");
        const workplace = await getInfoWorkplace(recoveredUser);
        setInfoWorkplace(workplace.data);
      } catch (error) {
        if (error.response.status === 401) logout();
      }
    })();
  }, []);

  return (
    <header className="container-fluid d-flex justify-content-end">
      <div className="d-flex align-items-center">
        <div>
          <span className="d-block m-0 p-0 text-white">
            {infoWorkplace?.nome}
          </span>
          <small className="m-0 p-0">Plano Gold</small>
        </div>
        <img alt="" src={infoWorkplace?.capa} />
        <span className="mdi mdi-chevron-down text-white"></span>
      </div>
      <div className="d-flex align-items-center">
        <span className="mdi mdi-logout text-white" onClick={logout}></span>
      </div>
    </header>
  );
};

export default Header;
