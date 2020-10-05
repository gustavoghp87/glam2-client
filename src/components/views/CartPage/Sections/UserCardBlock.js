import React from 'react'
import { Button } from 'react-bootstrap'
import { Row, Col } from 'antd'
import { Form } from 'react-bootstrap'
import { IMAGES_SERVER } from '../../../../hoc/Config'


function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `${IMAGES_SERVER}/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, state) => {
            
            let ocultarEnvios = {borderRadius:'10px', width:'45px'}
            if (product.envio) { ocultarEnvios = {display:'none'} }

            return (
                <tr key={product._id}>
                    
                    <td style={{textAlign:'center'}}>
                        <a href={`/product/${product._id}`}>
                            <h6 style={{fontWeight:'600', fontSize:'0.9rem', display:'block'}}> {product.title} </h6>
                            <img style={{width:'70px'}} alt="product" src={renderCartImage(product.images)} />
                            <br/>
                        </a>
                    </td>
                    
                    <td style={{textAlign:'center'}}> {product.quantity} unidad/es</td>
                    <td style={{textAlign:'center'}}>${product.price} </td>
                    <td style={{textAlign:'center'}}>${product.price*product.quantity} </td>

                    <td style={{textAlign:'center'}}>
                        <Button variant="dark" size="sm" style={ocultarEnvios} onClick={ 
                            () => props.addItem(product._id) }> + 1 </Button>
                    </td>
                    
                    <td style={{ textAlign:'center' }}>
                        <Button variant="dark" size="sm" style={ocultarEnvios} onClick={ 
                            () => props.subtractItem(product._id) }> - 1 </Button>
                    </td>

                    <td style={{textAlign:'center'}}>
                        <Button variant="danger" size="md" style={{borderRadius:'10px'}} onClick={
                            () => props.removeItem(product._id) }> Quitar </Button>
                    </td>

                </tr>
            )
        })
    )


    const renderItems2 = () => (
        props.products && props.products.map((product, state) => {
            
            let ocultarEnvios = {borderRadius:'10px', marginTop:'20px', marginBottom:'10px'}
            if (product.envio) { ocultarEnvios = {display:'none'} };

            return (
                <Row key={product._id} style={{marginBottom:'40px', paddingBottom:'10px', backgroundColor:'#e0e0e0', fontWeight:'600'}}>
                    
                    <Col xs={24}>
                        <div style={{display:'block', margin:'auto'}}>
                            <div style={{textAlign:'center', display:'block', margin:'auto', width:'200px'}}>
                                <a href={`/product/${product._id}`}>
                                    <br />
                                    <h6 style={{fontWeight:'600', fontSize:'1rem', display:'block', marginTop:'5px'}}> {product.title} </h6>
                                    <img style={{maxWidth:'150px', marginTop:'5px'}} alt="product" src={renderCartImage(product.images)} />
                                    <br />
                                </a>
                            </div>
                        </div>
                    </Col>
                    
                    <Col xs={24} style={{marginTop:'20px'}}>
                        <Row>
                            <Col xs={8} style={{border:'1px solid gray'}}>
                                <div style={{textAlign:'center'}}> Cantidad:<br/>{product.quantity} unidad/es</div>
                            </Col>
                            <Col xs={8} style={{border:'1px solid gray'}}>
                                <div style={{textAlign:'center'}}> Precio:<br/>${product.price} </div>
                            </Col>
                            <Col xs={8} style={{border:'1px solid gray'}}>
                                <div style={{textAlign:'center'}}> Total:<br/>${product.price*product.quantity} </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24}>
                        <Row style={{justifyContent:'space-evenly'}}>
                            <Button variant="dark" size="sm" style={ocultarEnvios}
                            onClick={() => props.addItem(product._id) }> + Sumar 1 </Button>
                            <Button variant="dark" size="sm" style={ocultarEnvios}
                            onClick={() => props.subtractItem(product._id) }> - Restar 1 </Button>
                            <Button variant="danger" size="md" style={{borderRadius:'10px', marginTop:'20px', marginBottom:'10px'}} onClick={() => props.removeItem(product._id) }> Quitar del Carrito </Button>
                        </Row>
                    </Col>
                </Row>
            )}
        )
    )


    const boton = () => {
        let importeEnvio = document.getElementById('envios').value
        if (importeEnvio>0) {
            props.addEnvio(importeEnvio)
        }
    }

    
    var estiloTabla1 = {}
    var estiloTabla2 = {display:'none'}
    try {
      if (window.screen.width<=767) {
        estiloTabla1 = {display:'none'}
        estiloTabla2 = {display:'block', margin:'auto'}
      }
    } catch(e) {}


    return (

        <div>
            <div style={estiloTabla2}>
                {renderItems2()}
            </div>

            <table style={estiloTabla1}>
                <thead>
                    <tr>
                        <th style={{textAlign:'center'}}> Producto </th>
                        <th style={{textAlign:'center'}}> Cantidad </th>
                        <th style={{textAlign:'center'}}> Precio </th>
                        <th style={{textAlign:'center'}}> Importe Total </th>
                        <th style={{textAlign:'center'}}> Sumar 1 </th>
                        <th style={{textAlign:'center'}}> Restar 1 </th>
                        <th style={{textAlign:'center'}}> Quitar del Carrito </th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>

            <div>
                <br/>
                <br/>
                <hr></hr>
                <br/>
                <Col xs={24} style={{textAlign:'center'}}>
                    <h2>Agregar pago de envíos</h2>
                    <Form.Label style={{display:'inline'}}><h6 style={{display:'inline'}}>Importe: &nbsp;&nbsp; $ &nbsp; </h6> </Form.Label>
                    <Form.Control type="number" name="envios" id="envios" style={{maxWidth:'80px', display:'inline', marginBottom:'10px'}}/>
                    <h6>(acordar por WhatsApp)</h6>
                    <Button variant={"primary"} onClick={boton} style={{display:'inline', marginTop:'10px', width:'250px'}}>AGREGAR ENVÍO</Button>
                </Col>
            </div>
        </div>
    )
}


export default UserCardBlock
