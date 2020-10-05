import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Form, Input, Select, Upload, Col, Row, Checkbox } from 'antd'
//import { UploadOutlined } from '@ant-design/icons'
import Button2 from 'react-bootstrap/Button'
import { FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from "react-redux"
import './product.css'
import { IMAGES_SERVER } from '../../../../hoc/Config'

const { Option } = Select;
const clasif = require('../../../utils/Clasif.json')


function ProductInfo(props) {

    const user = useSelector(state => state.user)

    var cantidad = "0"
    let isAdmin = {display:'none'}
    let isNotAdmin = {}
    try {
        if (user.userData) {
            user.userData.cart.forEach(element => {
                if (element.id === props.detail._id) {
                    cantidad = element.quantity
                }
            })
            document.getElementById('logueado1').style.display = 'flex'
            document.getElementById('logueado2').style.display = 'block'
            document.getElementById('logueado3').style.display = 'block'
            document.getElementById('logueado4').style.display = 'block'
            document.getElementById('logueado5').style.display = 'flex'

            if (user.userData.isAdmin) {
                isAdmin = {textAlign:'center'}
                isNotAdmin = {display:'none'}
            }
        }
    } catch(e) {}


    const [Product, setProduct] = useState({})
    const [id01, setId01] = useState({display:'none'})
    const [id02, setId02] = useState({display:'none'})

    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail, id01])

    const mostrar = () => {
        setId01({display:'block'})
        props.ocultarImgs()
    }

    const ocultar = () => {
        setId01({display:'none'})
        props.mostrarImgs()
    }

    const mostrarEdit = () => {
        setId02({display:'block'})
        props.ocultarImgs()
    }

    const ocultarEdit = () => {
        setId02({display:'none'})
        props.mostrarImgs()
    };

    let Clasif = [];
    for (let i in clasif) {
        Clasif.push(clasif[i])
    }

    const normFile = e => {
        console.log('Upload event:', e)
        if (Array.isArray(e)) {
            return e
        }
        return e && e.fileList;
    };

    const clasifX = "Clasif. (Actual: " + clasif[Product.types] + ")"
    const precioX = "Precio (Actual: $" + Product.price + ")"

    const checkboxer = (e) => {
        console.log(`checked = ${e.target.checked}`)
    };

    let clasifY = Product.types;
    const clasi = (value) => {
        clasifY = value
    }


    return (

        <div>
            <Descriptions title="Información del Producto" style={isNotAdmin}>
                <Descriptions.Item label="Precio" style={{fontWeight:'600', paddingBottom:'8px', paddingLeft:'15px'}}> ${Product.price} </Descriptions.Item>
                <Descriptions.Item label="Disponible" style={{fontWeight:'600', paddingBottom:'8px', paddingLeft:'15px'}}> Sí </Descriptions.Item>
                <Descriptions.Item label="Envíos" style={{fontWeight:'600', paddingBottom:'8px', paddingLeft:'15px'}}> Sí </Descriptions.Item>
                <Descriptions.Item label="Descripción" style={{backgroundColor:'lightgray', paddingLeft:'15px'}}> {Product.description} </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Información del Producto" style={isAdmin}>
                <Descriptions.Item label="Precio" style={{fontWeight:'600'}}> ${Product.price} </Descriptions.Item>
                <Descriptions.Item label="Vendidos"> {Product.sold} </Descriptions.Item>
                <Descriptions.Item label="Vistos"> {Product.views} </Descriptions.Item>
                <Descriptions.Item label="Descripción"> {Product.description} </Descriptions.Item>
            </Descriptions>
            <span style={{fontWeiht:'600'}}> &nbsp; Grupo:</span> {clasif[Product.types]}
            

            <br />
            <br />
            
            <div style={{display:'none', justifyContent: 'center'}} id="logueado1">
                <Button size="large" shape="round" type="danger" onClick={
                    () => { props.addToCart(Product._id) }}> Agregar al Carrito
                </Button>
            </div>

            <div style={{marginBottom:'20px'}}></div>

            <h3 style={{display:'none', textAlign:'center'}} id="logueado2"> Cantidad en el carrito: {cantidad} </h3>
            <div style={{marginBottom:'20px'}}></div>


            <div style={{display:'none', textAlign:'center'}} id="logueado3">
                <Button type="danger" ghost size="medium" shape="round" onClick={ 
                    () => { props.addToCart(Product._id) }}> + Sumar 1 
                </Button>
            </div>

            <div style={{marginBottom:'10px'}}></div>
            <div style={{display:'none', textAlign:'center'}} id="logueado4">
                <Button type="danger" ghost size="medium" shape="round" onClick={
                    () => { props.subtractCartItem(Product._id) }}> - Restar 1 
                </Button>
            </div>

            <div style={{marginBottom:'25px'}}></div>

            <div style={{display:'none', justifyContent:'center'}} id="logueado5">
                <Button2 variant="dark" style={{borderRadius:'20px'}} onClick={
                    () => { props.removeFromCart(Product._id) }}> Quitar del Carrito
                </Button2>
            </div>

            <div style={isAdmin}>
                <br/>
                <Button size="medium" shape="round" type="danger" onClick={() => {mostrarEdit()}} style={{display:'inline'}}>&nbsp;&nbsp;Editar&nbsp;&nbsp;</Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button size="medium" shape="round" type="danger" onClick={() => {mostrar()}} style={{display:'inline'}}>Eliminar</Button>

            </div>
            
            <div style={{marginBottom:'30px'}}></div>




            {/* //   MODAL DELETE */}

            <div style={id01} className={"modal"}>
                <form className={"modal-content"} action={"/productos"}>
                    <div className={"container"}>
                        <h1> ¿ELIMINAR PUBLICACIÓN? </h1>
                        <h3> {Product.title} </h3>

                        <div className={"clearfix"}>
                            <button type={"button"} className={"cancelbtn"} onClick={() => {ocultar()}}> Cancelar </button>
                            <button type={"button"} className={"deletebtn"} onClick={() => {props.deleteProduct(Product._id)} }> ELIMINAR </button>
                        </div>

                    </div>
                </form>
            </div>



            {/* //   MODAL EDITAR */}

            <div style={id02} className={"modal"}>
                <form className={"modal-content"}>
                    <div className={"container"} style={{maxWidth:'500px'}}>

                        <br/>
                        <h2> EDITAR PUBLICACIÓN </h2>
                        {/* <h3> {Product.title} </h3> */}


                        {/* //      TÍTULO */}

                        <InputGroup className="mb-3" style={{marginTop:'25px'}}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Título</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Título"
                                aria-label="Título"
                                aria-describedby="basic-addon1"
                                defaultValue={Product.title}
                                id="editTitle"
                            />
                        </InputGroup>


                        {/* //      DESCRIPCIÓN */}

                        <InputGroup>
                            <InputGroup.Prepend> <InputGroup.Text>Descripción</InputGroup.Text> </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="With textarea" defaultValue={Product.description} placeholder="Descripción" id="editDescription" />
                        </InputGroup>
                        

                        {/* //      PRECIO Y CLASIFICACIÓN */}

                        <Row style={{marginTop:'30px'}}>
                            <Col xs={11}>
                                <Form.Item
                                        label={precioX}
                                        rules={[ {required:true, message:'Falta la clasificación!' } ]}>
                                    <InputGroup>
                                        {/* <InputGroup.Prepend> <InputGroup.Text>Precio $</InputGroup.Text> </InputGroup.Prepend> */}
                                        <Input type="number" as="number" aria-label="With textarea" defaultValue={precioX} placeholder="Precio" id="editPrice"/>
                                    </InputGroup>
                                </Form.Item>
                            </Col>
                            <Col xs={2}></Col>
                            <Col xs={11}>
                                <Form.Item
                                    label={clasifX}
                                    rules={[ {required:true, message:'Falta la clasificación!' } ]}
                                    >
                                    <Select placeholder="Clasificación" id="editClasif" onChange={(value) => {clasi(value)}}>
                                        {Clasif.map((item, index) => (
                                            <Option value={index}> {item} </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        

                        {/* //      IMÁGENES */}

                        <div style={{display:'none'}}>
                        <Form.Item
                            label="Imágenes (orden y eliminar)"
                            rules={[ {required:true, message:'Faltan las imágenes!' } ]}>
                            {Product && Product.images && Product.images.map((imagen, index) => (
                                <div style={{display:'inline'}}>
                                    <h3>Esto no funciona</h3>

                                    <Input style={{maxWidth:'50px'}} type="number" as="number" aria-label="With textarea" defaultValue={index+1} />
                                    
                                    <img style={{maxWidth:'100px', margin:'20px'}} src={`${IMAGES_SERVER}/${imagen}`} />
                                    
                                    <Checkbox onChange={checkboxer}>Eliminar</Checkbox>
                                    
                                    <br/>
                                    <br/>
                                </div>
                            ))}
                            
                        </Form.Item>
                        </div>

                        <div className={"clearfix"}>
                            <button type={"button"} className={"cancelbtn"} onClick={() => {ocultarEdit()}}> Cancelar </button>
                            <button type={"button"} className={"editbtn"} onClick={() => {props.editProduct(Product._id, document.getElementById('editTitle').value, document.getElementById('editDescription').value, document.getElementById('editPrice').value, clasifY)}}> ACEPTAR </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductInfo
