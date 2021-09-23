import React from "react";
import { Button, Comment, Descriptions, List, Modal, Skeleton } from "antd";
import PropTypes from "prop-types";

const ModalMovieDetails = ({ movie, visible, onClose }) => {
  console.log("movie", movie);
  return (
      <Modal
          title="Detalles de la película"
          visible={visible}
          onCancel={onClose}
          footer={[
            <Button key="close" type="primary" onClick={onClose}>
              Cerrar
            </Button>,
          ]}
          width={900}
      >
        {movie ? (
            <>
              <Descriptions bordered>
                <Descriptions.Item label="Poster" span={3}>
                  <img src={movie.Poster} />
                </Descriptions.Item>
                <Descriptions.Item label="Título" span={3}>
                  {movie.Title}
                </Descriptions.Item>
                <Descriptions.Item label="Año" span={3}>
                  {movie.Year}
                </Descriptions.Item>
                <Descriptions.Item label="Género" span={3}>
                  {movie.Genre}
                </Descriptions.Item>
                <Descriptions.Item label="Director" span={3}>
                  {movie.Director}
                </Descriptions.Item>
                  <Descriptions.Item label="opinion" span={3}>
                      {"esta deberia ser un buen lugar"}
                  </Descriptions.Item>
              </Descriptions>
              {movie.comments && (
                  <List
                      className="comment-list"
                      header={`${movie.comments.length} comentarios`}
                      itemLayout="horizontal"
                      dataSource={movie.comments}
                      renderItem={(item) => (
                          <li>
                            <Comment
                                // actions={item.actions}
                                author={item.user}
                                avatar={
                                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                }
                                content={item.text}
                                datetime="hace un momento"
                            />
                          </li>
                      )}
                  />
              )}
            </>
        ) : (
            <Skeleton active />
        )}
      </Modal>
  );
};

ModalMovieDetails.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    Genre: PropTypes.string,
    Director: PropTypes.string,
    comments: PropTypes.array,
  }),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalMovieDetails;
