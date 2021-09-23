import React, { useState } from "react";
import PropTypes from "prop-types";
import { db, storage } from "../firebase";
import { Button, Form, Input, Progress, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "firebase";

const AddTodoForm = ({ userId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAddTask = async (values) => {
    setLoading(true);
    console.log("values", values);
    try {
      const todoTitle = values.title;
      const todoImage = values.image[0].originFileObj;

      const uploadTask = storage
          .ref()
          .child(`todos/${userId}/${todoImage.name}_${new Date().getTime()}`)
          .put(todoImage);

      uploadTask.on(
          "state_changed",
          function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setUploadProgress(progress.toFixed(0));
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function (error) {
            // Handle unsuccessful uploads
            console.log("error", error);
          },
          async function () {
            // Upload completed successfully, now we can get the download URL
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log("downloadURL", downloadURL);

            createTodo({ todoTitle, downloadURL });
          }
      );
    } catch (e) {
      console.log("e", e);
    }
  };

  const createTodo = async ({ todoTitle, downloadURL }) => {
    // guardar en firebase
    const todosListRef = db.ref(`todos/${userId}`);
    const newTodoRef = todosListRef.push();
    console.log("newTodoRef", newTodoRef.key);
    await newTodoRef.set({
      id: newTodoRef.key,
      title: todoTitle,
      imageURL: downloadURL,
    });
    form.resetFields();
    setLoading(false);
  };

  const onFinishFailed = () => {
    console.log("Form submit failed");
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
      <div>
        <Form
            name="todo-form"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            form={form}
            initialValues={{ remember: true }}
            onFinish={handleAddTask}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
          <Form.Item
              label="Nombre de la tarea"
              name="title"
              rules={[{ required: true, message: "Ingrese el título de su tarea" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              label="Imagen"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
          >
            <Upload
                name="logo"
                beforeUpload={() => false}
                listType="picture"
                maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Elige tu foto</Button>
            </Upload>
          </Form.Item>

          {loading && (
              <div>
                Subiendo imagen...
                <Progress percent={uploadProgress} size="small" />
              </div>
          )}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cambiar foto de perfil
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

AddTodoForm.propTypes = {
  onAddTask: PropTypes.func,
};

AddTodoForm.propTypes = {
  userId: PropTypes.string,
};

export default AddTodoForm;