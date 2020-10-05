import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Button } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { addToCartFromDetail, subtractCartItemFromDetail, removeCartItemFromDetail } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { PRODUCT_SERVER } from '../../../hoc/Config';


function DetailProductPage(props) {

    const dispatch = useDispatch()
    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])
    const [MostrarImgs, setMostrarImgs] = useState({display:'block'})


    useEffect(() => {
        Axios.get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
    }, [MostrarImgs])

    const mostrarImgsHandler = () => { setMostrarImgs({display:'block'}) }

    const ocultarImgsHandler = () => { setMostrarImgs({display:'none'}) }


    const addToCartHandler = (productId) => {
        dispatch(addToCartFromDetail(productId))
    }

    const subtractHandler = (productId) => {
        dispatch(subtractCartItemFromDetail(productId))
    }

    const removeHandler = (productId) => {
        dispatch(removeCartItemFromDetail(productId))
    }

    const user = useSelector(state => state.user)


    const editProductHandler = (productId, title, description, price, types) => {
        console.log(Product)
        if (title.trim()==="") {title=Product.title}
        if (description.trim()==="") {description=Product.description}
        if (price.trim()==="") {price=Product.price}
        types++
        if (types===undefined) {types=Product.types}
        
        const paquete = {title, description, price, types}

        const config = {
            method: 'POST',
            url: `${PRODUCT_SERVER}/editProduct?_id=${productId}`,
            headers: {'Content-Type': 'application/json'},
            data: paquete
        }

        Axios(config)
        .then(res => {
            console.log(res.data)
            if (res.data.edited===false) {alert("Algo falló al intentar editar el producto")}
            window.location.href = `/product/${productId}`
        })
    }


    const deleteProductHandler = (productId) => {
        Axios(`${PRODUCT_SERVER}/deleteProduct?_id=${productId}`)
        .then(res => {
            //console.log(res.data)
            if (res.data.remove===false) {alert("Algo falló al intentar eliminar el producto")}
            window.location.href = '/productos'
        })
    }



    return (

        <div className="postPage" style={{width:'100%', paddingTop:'2%', marginBottom:'200px'}}>

            <Button size="large" shape="round" type="danger" href={'/productos'} style={{float:'right', padding:"0 20px 0 20px"}}>
                Volver a Productos
            </Button>
            
            <h1 style={{textAlign:'center', marginTop:'60px'}}> {Product.title} </h1>
            
            <br />

            <Row gutter={[16, 16]} >
                
                <Col lg={12} xs={24} style={MostrarImgs}>
                    <ProductImage detail={Product} />
                </Col>
                
                <Col lg={1}> </Col>

                <Col lg={11} xs={24}>
                    <ProductInfo
                        addToCart={addToCartHandler}
                        subtractCartItem={subtractHandler}
                        removeFromCart={removeHandler}
                        editProduct={editProductHandler}
                        deleteProduct={deleteProductHandler}
                        ocultarImgs={ocultarImgsHandler}
                        mostrarImgs={mostrarImgsHandler}
                        detail={Product} />
                </Col>
                
            </Row>
        </div>
    )
}


export default DetailProductPage
