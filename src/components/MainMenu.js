import React from "react";
import { Button, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "../firebase";

const MainMenu = ({ user }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/iniciar-sesion");
  };
  return (
      <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          className="main-menu"
      >

        {/*<Menu.Item>*/}
        {/*  <a*/}
        {/* esto si debe ser comentado      eslint-disable-next-line no-undef */}
        {/*      href={`${process.env.REACT_APP_URL}/netflix`}*/}
        {/*      target="_blank"*/}
        {/*      rel="noreferrer"*/}
        {/*  >*/}
        {/*    Netflix*/}
        {/*  </a>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item>*/}
        {/*  <Link to="/netflix">Netflix</Link>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item>*/}
        {/*  <Link to="/tareas">Tareas</Link>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item>*/}
        {/*  <Link to="/acerca-de">Acerca de...</Link>*/}
        {/*</Menu.Item>*/}

        {user === null ? null : user === false ? (
            <>
              <Menu.Item>
                <Link to="/inicio">Inicio</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/registro">Registrarme</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/iniciar-sesion">Iniciar sesión</Link>
              </Menu.Item>
            </>
        ) : (
            <>
            <Menu.Item>
              <Button onClick={handleLogout}>Cerrar sesión</Button>
            </Menu.Item>
          <Menu.Item>
          <Link to="/historias">Historias</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/perfil">Perfil</Link>
          </Menu.Item>
          <Menu.Item>
          <Link to="/crearhistoria">Crear Historia</Link>
          </Menu.Item>
            </>
        )}
      </Menu>
  );
};

MainMenu.propTypes = {
  user: PropTypes.shape(),
};

export default MainMenu;