import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Form, Input, Pagination, Row } from "antd";
import MovieCard from "./MovieCard";
import ModalAddComment from "./ModalAddComment";

const types = {
  peliculas: "movie",
  series: "series",
  episodios: "episode",
};

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentMovie, setCurrentMovie] = useState(null);

  let { type } = useParams();
  console.log("type", type);

  useEffect(() => {
    const getMovies = async () => {
      if (searchValue) {
        const typeParam = types[type] ? types[type] : "";
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=34fa235a&s=${searchValue}&page=${currentPage}&type=${typeParam}`
        );
        const moviesArray = await response.json();
        console.log("moviesArray", moviesArray);
        if (moviesArray.Search) {
          setMovies(moviesArray.Search);
        } else {
          setMovies([]);
        }
        setTotalResults(moviesArray.totalResults);
      }
    };

    getMovies();
  }, [searchValue, currentPage, type]);

  const handleSearch = (values) => {
    console.log("values", values);
    setSearchValue(values.search);
    setCurrentPage(1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo", errorInfo);
  };

  const handlePageChange = (page) => {
    console.log("page", page);
    setCurrentPage(page);
  };

  const handleAddComment = (comment) => {
    console.log("Add comment", currentMovie, comment);
    const newMovies = [...movies];
    const movieToAddComment = newMovies[currentMovie];
    const newComment = {
      text: comment,
      createdAt: new Date(),
      user: "Chalo",
    };
    if (movieToAddComment.comments) {
      movieToAddComment.comments.push(newComment);
    } else {
      movieToAddComment.comments = [newComment];
    }

    setMovies(newMovies);
  };

  const handleShowCommentForm = (index) => {
    setCurrentMovie(index);
  };

  const handleCloseCommentForm = () => {
    setCurrentMovie(null);
  };

  console.log("currentMovie", currentMovie);
  console.log("movies", movies);

  return (
    <>
      <Row>
        <Col>
          {type ? (
            <p>Filtrando por: {type}</p>
          ) : (
            <p>Mostrando todos los resultados</p>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSearch}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Buscar"
              name="search"
              rules={[
                {
                  required: true,
                  message: "Ingresa el criterio de búsqueda",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Buscar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {!searchValue && (
        <Row>
          <Col>Ingrese el título de una película para realizar a búsqueda</Col>
        </Row>
      )}

      {totalResults > 0 && (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={totalResults}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      )}

      <Row justify="space-between">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Col key={`${movie.imdbID}-${index}`}>
              <MovieCard
                movie={movie}
                onShowCommentForm={() => handleShowCommentForm(index)}
              />
            </Col>
          ))
        ) : (
          <p>No existen coincidencias</p>
        )}
      </Row>

      {totalResults > 0 && (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          total={totalResults}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      )}

      <ModalAddComment
        onAddComment={handleAddComment}
        visible={currentMovie !== null}
        onClose={handleCloseCommentForm}
      />
    </>
  );
};

export default MoviesList;
