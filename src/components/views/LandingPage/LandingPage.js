import React from 'react'
import { Carousel } from 'react-bootstrap'


function LandingPage() {

    let presentation = {marginRight:'15%', marginLeft:'15%', marginTop:'1%', marginBottom:'15%'}
    var carrusel = {}
    let img = {}
    try {
        if (window.screen.width<=767) {
          presentation = {marginRight:'4%', marginLeft:'4%', marginTop:'1%', marginBottom:'15%'}
          carrusel = {maxWidth:'100%'}
        }
    } catch(e) {}

    
    return (

        <div style={presentation}>

            <h1 style={{display:'none', textAlign:'center', marginTop:'30px', color:'violet'}}> GLAMSTUDIO </h1>
            <h3 style={{display:'none', textAlign:'center', marginBottom:'20px'}}> Senillosa 226 - CABALLITO </h3>

            <Carousel>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/glamprimera.jpeg" alt="First slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic1.jpeg" alt="Second slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic2.jpeg" alt="Third slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic3.jpeg" alt="Forth slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>

            <br/><br/><br/><br/>
        </div>
    )
}


export default LandingPage
