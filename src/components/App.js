import { Layout } from "antd";
import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
// import TodosPage from "../pages/TodosPage";
import AboutPage from "../pages/AboutPage";
import Perfil from "../pages/PerfilPage";
import MainMenu from "./MainMenu";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import tintaeterea from "../images/tintaeterwhite.png";
import InitPage from "../pages/InitPage"

import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import HistoriasPage from "../pages/HistoriasPage";
import CreateHistoryPage from "../pages/CreateHistoryPage";

const { Header, Footer, Content } = Layout;

function App() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("uid", uid);
        setAuthUser(user);
      } else {
        // User is signed out
        console.log("No hay ssesion activa", user);
        setAuthUser(false);
      }
    });
  }, []);

  return (
      <Router>
        <Layout>
          <Header className="main-header">
            <div ><img src={tintaeterea} alt={"reactimg"} className="logo"/></div>
            <MainMenu user={authUser} />
          </Header>

          <Content className="main-content">
            <Switch>
              <Route path="/perfil">
                {authUser === null ? (
                    "Cargando..."
                ) : authUser === false ? (
                    <Redirect to="/iniciar-sesion" />
                ) : (
                    // <TodosPage userId={authUser.uid} />  ir al todo funcional
                    <Perfil/>
                )}
              </Route>
              <Route path="/registro">
                {authUser === null ? (
                    "Cargando..."
                ) : authUser === false ? (
                    <RegisterPage />
                ) : (
                    <Redirect to="/historias" />
                )}
              </Route>
              <Route path="/iniciar-sesion">
                {authUser === null ? (
                    "Cargando..."
                ) : authUser === false ? (
                    <LoginPage />
                ) : (
                    <Redirect to="/historias" />
                )}
              </Route>
              <Route path="/inicio">
                <InitPage />
              </Route>
              <Route path="/historias">
                <HistoriasPage />
              </Route>
              <Route path="/crearhistoria">
                <CreateHistoryPage />
              </Route>
            </Switch>
          </Content>
          {/*es para ver el inicio con algo */}
          {/*<Redirect to="/inicio" />*/}
          {/*<Footer>Footer</Footer>*/}
        </Layout>
      </Router>
  );
}

export default App;