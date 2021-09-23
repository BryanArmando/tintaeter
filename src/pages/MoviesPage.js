import { Col, Row } from "antd";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import MoviesList from "../components/MoviesList";

const MoviesPage = () => {
  let match = useRouteMatch();

  console.log("match", match);

  return (
      <>
        <Row>
          <Col>
            <ul>
              <li>
                <Link to={`${match.url}`}>Todos</Link>
              </li>
              <li>
                <Link to={`${match.url}/peliculas`}>Películas</Link>
              </li>
              <li>
                <Link to={`${match.url}/series`}>Series</Link>
              </li>
              <li>
                <Link to={`${match.url}/episodios`}>Episodios</Link>
              </li>
            </ul>
          </Col>
        </Row>

        <Switch>
          <Route path={`${match.path}/:type`}>
            <MoviesList />
          </Route>
          <Route path={match.path}>
            <MoviesList />
          </Route>
        </Switch>
      </>
  );
};

export default MoviesPage;