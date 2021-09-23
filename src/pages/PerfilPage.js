import {Button, Col, Form, Input, message, Modal} from "antd";
import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { formItemLayout } from "../utils/formLayout";
import tintaeter from "../images/tintaeter.png"
import "../styles/Perfil.css";
import { db1,auth,database } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import translateMessage from "../utils/translateMessage";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {hola} from "./LoginPage";


const Perfil = () => {
    console.log(hola)

    const getuser = async ()=>{
        const querySnapshot= await db1.collection("tinta-eterea-default-rtdb.users").get();
        console.log(querySnapshot)
        /*querySnapshot.forEach(element => {
        console.log(element)
    })*/;
    }

    useEffect(()=>{
        getuser();
    },[])
    
    const [isModalVisible, setIsModalVisible] = useState(false);
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
          history.push("/tareas");
        } catch (error) {
          const errorCode = error.code;
          console.log("errorCode", errorCode);
          message.error(translateMessage(errorCode));
        }}

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return(
        <>
        <div id="tod">
            <div id="photodiv">
            <div id="btndiv">
                <Button type="dashed" htmlType="button" size="large" block>Nombre de Usuario</Button>
            </div>
                <img id="photoUsr" src="https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"/>
               
                

            </div>
            <div id="bottndiv">
                <div id="btndiv">
                    <Button type="primary" htmlType="button" shape="round" size="large" block onClick={showModal}>Datos personales</Button>
                <Modal title="Datos personales" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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

      </Form>
    </div>
                </Modal>
                </div>
                <div id="btndiv">
                    <Button type="primary" htmlType="button" shape="round" size="large" block="primary"><Link to="/historias">Historias compartidas</Link></Button>
                    
                </div>
                <div id="btndiv">
                    <Button type="primary" htmlType="button" shape="round" size="large" block="primary"><Link to="/historias">Historias en las que participo</Link></Button>   
                </div>
            </div>
        </div>
        </>
        )
}

export default Perfil;