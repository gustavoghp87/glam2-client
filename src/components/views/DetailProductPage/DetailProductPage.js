import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col, Button } from 'antd'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { addToCartFromDetail, subtractCartItemFromDetail, removeCartItemFromDetail }
    from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'
import { PRODUCT_SERVER } from '../../../hoc/Config'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'


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
    }, [MostrarImgs, productId])

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


    const editProductHandler = (productId, title, description, price, types) => {
        //console.log(Product)
        if (title.trim()==="") {title=Product.title}
        if (description.trim()==="") {description=Product.description}
        if (price.trim()==="") {price=Product.price}
        types++
        if (types===undefined) {types=Product.types}
        
        const paquete = {token:document.cookie, title, description, price, types}

        const config = {
            method: 'POST',
            url: `${PRODUCT_SERVER}/editProduct?_id=${productId}`,
            headers: {'Content-Type': 'application/json'},
            data: paquete
        }

        Axios(config).then(res => {
            //console.log(res.data)
            if (!res.data.edited) alert("Algo falló al intentar editar el producto")
            window.location.href = `/product/${productId}`
        })
    }


    const deleteProductHandler = (productId) => {
        Axios.post(`${PRODUCT_SERVER}/deleteProduct?_id=${productId}`, {token:document.cookie})
        .then(res => {
            if (res.data.remove===false) alert("Algo falló al intentar eliminar el producto")
            window.location.href = '/productos'
        })
    }


    return (

        <div className="postPage" style={{width:'100%', paddingBottom:'200px'}}>

            <Button size="large" shape="round" type="danger"
                style={{
                    padding: '0 15px', position: props.mobile ? '' : 'absolute',
                    right: props.mobile ? '' : '0',
                    display: props.mobile ? 'block' : '',
                    margin: props.mobile ? '0 20px 0 auto' : '0 20px 0 0'
                }}
            >

                <Link to={'/productos'} style={{textDecoration:'none'}}> Volver a Productos </Link>

            </Button>
            

            <h1 style={{textAlign:'center', color:props.ColorFont,
                margin: props.mobile ? '40px auto 50px auto' : '40px auto 60px auto'}}>
                {Product.title}
            </h1>


            <Row>
                
                <Col lg={12} xs={24} style={MostrarImgs, {padding: props.mobile ? '0 0 10px 0px' : '10px'}}>
                    <ProductImage detail={Product} />
                </Col>


                <Col lg={12} xs={24} style={{padding: props.mobile ? '' : '10px'}}>

                    <ProductInfo
                        addToCart={addToCartHandler}
                        subtractCartItem={subtractHandler}
                        removeFromCart={removeHandler}
                        editProduct={editProductHandler}
                        deleteProduct={deleteProductHandler}
                        ocultarImgs={ocultarImgsHandler}
                        mostrarImgs={mostrarImgsHandler}
                        props={props}
                        detail={Product}
                    />

                </Col>
                
            </Row>
        </div>
    )
}


export default DetailProductPage
