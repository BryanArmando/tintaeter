import React, { useState } from "react";
import PropTypes from "prop-types";
import { db, storage } from "../firebase";
import {Button, Col, Form, Input, Progress, Row, Upload} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "firebase";
import CreateHistory from "../styles/CreateHistory.css"
import tintaeter from "../images/tintaeter.png";
const AddHistoryForm = ({ userId }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleAddTask = async (values) => {
        setLoading(true);
        console.log("values", values);
        try {
            const todoTitle = values.title;
            const todoImage = values.image[0].originFileObj;
            const todoGenre = values.genre;
            const todoText = values.text;

            const uploadTask = storage
                .ref()
                .child(`history/${userId}/${todoImage.name}_${new Date().getTime()}`)
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

                    createHisto({ todoTitle, downloadURL, todoGenre, todoText });
                }
            );
        } catch (e) {
            console.log("e", e);
        }
    };

    const createHisto = async ({ todoTitle, downloadURL, todoGenre, todoText}) => {
        // guardar en firebase
        const todosListRef = db.ref(`history/${userId}`);
        const newTodoRef = todosListRef.push();
        console.log("newTodoRef", newTodoRef.key);
        await newTodoRef.set({
            id: newTodoRef.key,
            title: todoTitle,
            imageURL: downloadURL,
            genre: todoGenre,
            text: todoText,
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
        <Row className="Contentform">
            <Col span={8}>
                <img src={tintaeter} alt={"reactimg"}/>
                <h1>Haz que tus historias cobren vida</h1>
            </Col>
        <Col span={15}>
            <Form
                className="hisform"
                name="todo-form"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
                form={form}
                initialValues={{ remember: true }}
                onFinish={handleAddTask}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Titulo de la historia"
                    name="title"
                    rules={[{ required: true, message: "Ingrese el título de su historia" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Portada"
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
                        <Button icon={<UploadOutlined />}>Agrega una foto de portada</Button>
                    </Upload>
                </Form.Item>


                <Form.Item
                    label="Genero de la historia"
                    name="genre"
                    rules={[{ required: true, message: "Ingrese el genero al que pertenece su historia" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ingrese sinopsis de su historia"
                    name="text"
                    rules={[{ required: true, message: "Ingrese la sinpsis de su historia" }]}
                >
                    <Input.TextArea rows={10} showCount maxLength={200} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Crear Historia
                    </Button>
                </Form.Item>
                {loading && (
                    <div>
                        Subiendo datos...
                        <Progress percent={uploadProgress} size="small" />
                    </div>
                )}
            </Form>
        </Col>
        </Row>
    );
};

AddHistoryForm.propTypes = {
    onAddTask: PropTypes.func,
};

AddHistoryForm.propTypes = {
    userId: PropTypes.string,
};

export default AddHistoryForm;