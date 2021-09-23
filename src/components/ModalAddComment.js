import React from "react";
import { Avatar, Button, Comment, Modal, Form, Input } from "antd";
import PropTypes from "prop-types";

const { TextArea } = Input;

const ModalAddComment = ({ visible, onClose, onAddComment }) => {
  const handleSubmit = ({ comment }) => {
    console.log("Anadir comentario", comment);
    onAddComment(comment);
  };

  return (
      <Modal
          title="Añadir comentario"
          visible={visible}
          onCancel={onClose}
          footer={[
            <Button key="close" type="primary" onClick={onClose}>
              Cerrar
            </Button>,
          ]}
          width={900}
      >
        <Comment
            avatar={
              <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
              />
            }
            content={
              <Form onFinish={handleSubmit}>
                <Form.Item
                    name="comment"
                    rules={[
                      { required: true, message: "Ingresa el texto del comentario" },
                    ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Añadir Comentario
                  </Button>
                </Form.Item>
              </Form>
            }
        />
      </Modal>
  );
};

ModalAddComment.propTypes = {
  visible: PropTypes.bool,
  onAddComment: PropTypes.func,
  onClose: PropTypes.func,
};

export default ModalAddComment;