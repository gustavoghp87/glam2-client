import React from 'react'
import { Carousel } from 'react-bootstrap'


function LandingPage(props) {

    let presentation = {
        padding: props.mobile ? '50px 4% 15% 4%' : '150px 15% 15% 15%',
        backgroundColor: props.ColorPrimary
    }

    var carrusel = {maxWidth: props.mobile ? '100%' : '100%'}
    let img = {}

    
    return (

        <div style={presentation}>

            <h1 style={{display:'none', textAlign:'center', marginTop:'30px', color:props.ColorFont}}> GLAMSTUDIO </h1>
            <h3 style={{display:'none', textAlign:'center', marginBottom:'20px'}}> Senillosa 226 - CABALLITO </h3>

            <Carousel>

                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/glamprimera.png" alt="First slide" 
                        style={img} />
                </Carousel.Item>

                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic1.png" alt="Second slide"
                        style={img} />
                </Carousel.Item>

                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic2.png" alt="Third slide"
                        style={img} />
                </Carousel.Item>

                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic3.png" alt="Forth slide"
                        style={img} />
                </Carousel.Item>

            </Carousel>

            <br/><br/><br/><br/>

        </div>
    )
}


export default LandingPage
