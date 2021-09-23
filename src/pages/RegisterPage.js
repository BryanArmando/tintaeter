import React from "react";
import { Row, Col } from 'antd';
import { Button, Form, Input, message } from "antd";
import { auth, db } from "../firebase";
import translateMessage from "../utils/translateMessage";
import { Link } from "react-router-dom";
import { formItemLayout, tailFormItemLayout } from "../utils/formLayout";
import tintaeter from "../images/tintaeter.png";
import "../styles/LoginPage.css"

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = async ({ email, password, name }) => {
    // console.log("values", values);

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
      await db.ref(`users/${user.uid}`).set({
        id: user.uid,
        name,
        email,
      });

      message.success("Usuario registrado correctamente");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      message.error(translateMessage(errorCode));
    }
  };

  return (
      <Row className="fondolog" >
        <Col span={1}></Col>
        <Col span={11} className="logotinta">
          <img src={tintaeter} alt={"reactimg"}/>
          <h1>Registro De Usuarios</h1>
          <h1>Completa el formulario</h1>
        </Col>
        <Col span={2}></Col>
        <Col span={9} className="formulario" >
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="login-form"
      >
        <Form.Item
          name="name"
          label="Nombre de usuario"
          tooltip="Cuéntanos como te llamas."
          rules={[
            {
              required: true,
              message: "Ingresa tu nombre",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Correo electrónico"
          rules={[
            {
              type: "email",
              message: "Ingresa un correo válido",
            },
            {
              required: true,
              message: "Este campo es obligatorio",
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar contraseña"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Confirma tu contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout} className="contbutton">
          <Button type="primary" htmlType="submit">
            Registrarse
          </Button>
        </Form.Item>

        <Form.Item>
          ¿Ya tienes una cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link>
        </Form.Item>
      </Form>
    </div>
        </Col>
      </Row>
  );
};

export default RegisterPage;
