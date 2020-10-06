import React from 'react'
import { Carousel } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function LandingPage() {

    const { ColorPrimary, ColorSecundary, ColorFont } = useSelector(state => state.mode)
    let presentation = {padding:'150px 15% 15% 15%', backgroundColor:ColorPrimary}
    var carrusel = {}
    let img = {}
    try {
        if (window.screen.width<=767) {
          presentation = {margin: '50px 4% 15% 4%'}
          carrusel = {maxWidth:'100%'}
        }
    } catch(e) {}

    
    return (

        <div style={presentation}>

            <h1 style={{display:'none', textAlign:'center', marginTop:'30px', color:'violet'}}> GLAMSTUDIO </h1>
            <h3 style={{display:'none', textAlign:'center', marginBottom:'20px'}}> Senillosa 226 - CABALLITO </h3>

            <Carousel>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/glamprimera.png" alt="First slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic1.png" alt="Second slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic2.png" alt="Third slide" style={img} />
                    {/* <Carousel.Caption>
                        <h3></h3>
                        <p></p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item style={carrusel}>
                    <img className="d-block w-100" src="/imgs/pic3.png" alt="Forth slide" style={img} />
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
