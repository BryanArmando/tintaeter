import {Button, Col, Form, Input, message} from "antd";
import { Row } from 'antd';
import React from "react";
import tintaeter from "../images/tintaeter.png"
import "../styles/InitPage.css"
import {Link} from "react-router-dom";

const InitPage = () => {

    return(
        <div className="content">
        <Row>
            <Col span={24} className="imagen">
            <img src={tintaeter} alt={"reactimg"}/>
            </Col>
        </Row>
        <Row>
            <Col span={12} className="imagen">
            <Button type="primary" htmlType="button" shape="round" size="large">
                <Link to="/iniciar-sesion"> Iniciar Sesión</Link>
            </Button>
            </Col>
            <Col span={12} className="imagen">
            <Button type="primary" shape="round" size="large">
                <Link to="/registro"> Registrarse</Link>
            </Button>
            </Col>
        </Row>
        </div>
    );

};
export default InitPage;
