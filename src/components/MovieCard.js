import { Card } from "antd";
import { CommentOutlined, EyeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "../styles/MovieCard.css";
import { useEffect, useState } from "react";
import ModalMovieDetails from "./ModalMovieDetails";

const { Meta } = Card;

const MovieCard = ({ movie, onShowCommentForm }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  // const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (showDetails) {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=34fa235a&i=${movie.imdbID}`
        );
        const movieData = await response.json();
        setMovieDetails({
          ...movieData,
          comments: movie.comments,
        });
      }
    };
    getMovieDetails();
  }, [showDetails]);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  // const handleShowAddCommentForm = () => {
  //   console.log("show add comments");
  //   onShowCommentForm();
  // };

  // const handleCloseCommentFrom = () => {
  //   setShowAddCommentForm(false);
  // };

  return (
      <>
        <Card
            className="movie-card"
            cover={<img alt={movie.Title} src={movie.Poster} />}
            actions={[
              <EyeOutlined key="view" onClick={handleShowDetails} />,
              <CommentOutlined key="comentarios" onClick={onShowCommentForm} />,
            ]}
        >
          <Meta title={`${movie.Title} - ${movie.Year}`} />
        </Card>

        <ModalMovieDetails
            movie={movieDetails}
            visible={showDetails}
            onClose={handleClose}
        />
      </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
    Type: PropTypes.string,
    Poster: PropTypes.string,
    comments: PropTypes.array,
  }),
  onShowCommentForm: PropTypes.func,
};

export default MovieCard;
