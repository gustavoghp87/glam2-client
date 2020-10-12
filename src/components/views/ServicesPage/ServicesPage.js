import React from 'react'
import { Card, Row } from 'react-bootstrap'


function ServicesPage(props) {

    const cards = {
        width: '280px',
        height: '455px',
        marginRight: '20px',
        marginBottom: '40px'
    }

    const images = {
        border:'1px solid lightgray'
    }

    const title = {
        textAlign:'center'
    }

    return (
        <div style={{
            width:'75%', 
            margin:'auto', 
            textAlign:'center', 
            padding: props.mobile ? '5px 0' : '40px 0 80px 0'
        }}>

            <div style={{textAlign:'center', paddingBottom: props.mobile ? '5px' : '50px'}}>
                <h2 style={{color:props.ColorFont}}> NUESTROS SERVICIOS </h2>
            </div>

            <Row style={{justifyContent:"space-evenly"}}>
                <Card style={cards}>
                    <Card.Img variant="top" src="imgs/services7.png" style={images}/>
                    <Card.Body>
                        <Card.Title style={title}> MAQUILLAJE </Card.Title>
                        <Card.Text>
                            para eventos: novias, madrinas, 15 años, invitadas
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <Card style={cards}>
                    <Card.Img variant="top" src="imgs/services8.png" style={images}/>
                    <Card.Body>
                        <Card.Title style={title}> CABELLO </Card.Title>
                        <Card.Text>
                            corte, <i>brushing</i>, peinados para eventos, color, <i>patch</i>, balayage, desgaste, nutrición, botox, queratina, alisado
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <Card style={cards}>
                    <Card.Img variant="top" src="imgs/services4.png" style={images}/>
                    <Card.Body>
                        <Card.Title style={title}> PESTAÑAS </Card.Title>
                        <Card.Text>
                            colocación para eventos, extensión PxP, permanente, <i>lifting</i>, teñido
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <Card style={cards}>
                    <Card.Img variant="top" src="imgs/services1.png" style={images}/>
                    <Card.Body>
                        <Card.Title style={title}> CEJAS </Card.Title>
                        <Card.Text>
                            diseño y perfilado, laminado
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <Card style={cards}>
                    <Card.Img variant="top" src="imgs/services5.png" style={images}/>
                    <Card.Body>
                        <Card.Title style={title}> UÑAS </Card.Title>
                        <Card.Text>
                            tradicional, <i>kapping</i>, sistema <i>dipping</i>, esmaltado semipermanente 
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
                <Card style={cards}>
                    <Card.Img variant="top" src="imgs/services3.png" style={images}/>
                    <Card.Body>
                        <Card.Title style={title}> CLASES </Card.Title>
                        <Card.Text>
                            de automaquillaje
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>

            </Row>

            <br/><br/><br/><br/><br/>

        </div>
    )
}

export default ServicesPage
