import { Row, Col } from 'antd';
import { Image } from 'antd';
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import translateMessage from "../utils/translateMessage";
import { formItemLayout } from "../utils/formLayout";
import tinta from "../images/tinta.png"
import tintaeter from "../images/tintaeter.png"
import "../styles/LoginPage.css"
import React,{useEffect, useState} from "react";

const LoginPage = () => {
  const [email1, setEmail] = useState()
  const [pass, setPass] = useState()
  var hola=null;


  let history = useHistory();

  const onFinish = async ({ email, password }) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log("user", user);
      history.push("/historias");
    } catch (error) {
      const errorCode = error.code;
      console.log("errorCode", errorCode);
      message.error(translateMessage(errorCode));
    }
    console.log({email,password})
    setEmail(email)
    setPass(password)
    hola=email;
    console.log(email1,pass)
    console.log("datos almacenados", hola)


  };

  return(
      <Row className="fondolog" >
        <Col span={1}></Col>
        <Col span={11} className="logotinta">
          <img src={tintaeter} alt={"reactimg"}/>
          <h1>Inicio de Sesión</h1>
          <h1>Completa los campos</h1>
        </Col>
        <Col span={2}></Col>
        <Col span={9} className="formulario" >

    <div>
      <Form
        {...formItemLayout}
        name="login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: "Ingresa tu correo electrónico" },
            {
              type: "email",
              message: "Ingresa un correo válido",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: "Ingresa tu contraseña" }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <a href="">Olvidé mi contraseña</a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form.Item>

        <Form.Item>
          ¿Aún no tienes una cuenta?{" "}
          <Link to="/registro">Regístrate ahora!</Link>
        </Form.Item>
      </Form>
    </div>
        </Col>
      </Row>
  );
};

export default LoginPage;
export var hola;