import { Carousel } from 'antd';
import { Card } from 'antd';
import "../styles/HistoriasPage.css";

const HistoriasPage = () => {
    const contentStyle = {
        height: '60px',
        color: '#fff',
        lineHeight: '60px',
        textAlign: 'center',

    };
    const { Meta } = Card;

    return(
        <>
        <div className="Carrucel">
            <h2>Lo nuevo</h2>
            <Carousel autoplay>
                <div className="carru1">
                    <h3 style={contentStyle}>Historias de Guerra</h3>
                </div>
                <div className="carrul2">
                    <h3 style={contentStyle}>Tinta sangre</h3>
                </div>
                <div className="carrul3">
                    <h3 style={contentStyle}>Escritos curiosos</h3>
                </div>
                <div className="carrul4">
                    <h3 style={contentStyle}>La historia de mi vida</h3>
                </div>
            </Carousel>
        </div>
            <h2>Para ti</h2>
            <div className="Reciente" >
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://static.cegal.es/imagenes/marcadas/9788467/978846777538.gif   " />}
                >
                    <Meta title="En tus sueños" description="www.tintaeterea.com" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://i2.wp.com/linaestadeviaje.com/wp-content/uploads/2020/06/2-4.jpg?resize=500%2C500&ssl=1" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/9789875457683.jpg" />}
                >
                    <Meta title="Amor" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://static.cegal.es/imagenes/marcadas/9788467/978846777538.gif   " />}
                >
                    <Meta title="En tus sueños" description="www.tintaeterea.com" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://i2.wp.com/linaestadeviaje.com/wp-content/uploads/2020/06/2-4.jpg?resize=500%2C500&ssl=1" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://www.normainfantilyjuvenil.com/ar/uploads/2019/05/9789875457683.jpg" />}
                >
                    <Meta title="Amor" description="www.instagram.com" />
                </Card>
            </div>

        </>
    );

};
export default HistoriasPage;