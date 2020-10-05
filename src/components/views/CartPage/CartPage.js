import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCartItems, removeCartItemFromCartPage, addToCartFromCartPage, subtractCartItemFromCartPage, addEnvio} from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Result, Empty } from 'antd'
import { IMAGES_SERVER, USER_SERVER } from '../../../hoc/Config'


function CartPage(props) {

    const dispatch = useDispatch()
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [numCarrito, setNumCarrito] = useState(0)
    const user = useSelector(state => state.user)

    useEffect(() => {
        let cartItems = []
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then((response) => {
                        if (response.payload.length > 0) {
                            calculateTotal(response.payload)
                            calculateCartNumber(response.payload)
                        }
                    }
                )
            }
        }
    }, [props.user.userData])


    const calculateCartNumber = (cartDetail) => {
        var numCarrito = 0
        try {
            cartDetail.forEach( element => {
                numCarrito += element.quantity;    // sumar por ítem: user.userData.cart.length  
            })
            setNumCarrito(numCarrito)
        } catch(e) {}
        return numCarrito
    }

    const calculateTotal = (cartDetail) => {
        let total = 0
        cartDetail.map(item => {
            total += parseFloat(item.price, 10) * item.quantity
            return total
        })
        setTotal(total)
        setShowTotal(true)
    }


    const RemoveFromCart = (productId) => {
        dispatch(removeCartItemFromCartPage(productId))
            .then( response => {
                if (response.payload.cartDetail.length <= 0)
                    setShowTotal(false)
                else
                    calculateTotal(response.payload.cartDetail)
            }
        )
    }

    const AddToCart = (productId) => {
        dispatch(addToCartFromCartPage(productId))
            .then( response => {
                //console.log("Response CARTPAGE ante agregar:", response.payload)
                if (response.payload.length <= 0)
                    setShowTotal(false)
                else
                    calculateTotal(response.payload)
            }
        )
    }

    const AddEnvio = (importe) => {
        dispatch(addEnvio(importe))
            .then((response) => {
                //console.log("Response CARTPAGE ante agregar:", response.payload)
                if (response.payload.length <= 0)
                    setShowTotal(false)
                else
                    calculateTotal(response.payload)
            }
        )
    }

    const SubtractToCart = (productId) => {
        dispatch(subtractCartItemFromCartPage(productId))
            .then((response) => {
                if (response.payload.length <= 0)
                    setShowTotal(false)
                else
                    calculateTotal(response.payload)
            }
        )
    }


    const pagarMP = () => {

        let items = []
        user.userData.cart.forEach(element => {
            let id = element.id
            let unit_price = 0
            let title = ""
            let description = ""
            let picture_url = ""
            let quantity = element.quantity

            user.cartDetail.forEach(item => {
                if (item._id === id) {
                    unit_price = item.price
                    title = item.title
                    description = item.description
                    picture_url = `${IMAGES_SERVER}/${item.images[0]}`
                    if (description.length>255)
                        description = description.slice(0, 255)
                }
            })

            if (quantity>0) {
                items.push({
                    id,
                    title,
                    description,
                    category_id: "glamstudio-makeup",
                    quantity,
                    currency_id: 'ARS',
                    picture_url,
                    unit_price
                })
            }
        })

        var bodyJson = { items }

        fetch(`${USER_SERVER}/procesar-pago`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bodyJson)
        })
        .then((response) => {
            return response.json()
        })
        .then((init_point) => {
//            console.log("Llegó:", init_point);
            window.open(init_point.url, '_blank')
        })
    }


    var estiloCorreo = {marginBottom:'20px', color:'gray', fontSize:'1.7rem', fontWeight:'600'}
    try {
        if (window.screen.width<767) {
            estiloCorreo = {marginBottom:'20px', color:'gray', fontSize:'1.5rem', fontWeight:'600'}
        }
    } catch(e) {}
    


    if (user.userData) {
        const correo = user.userData.email;
        
        return (
            <div style={{width:'85%', marginLeft:'8%', marginRight:'10%', marginBottom:'0', minHeight:'800px'}}>
                
                <h1 style={{marginTop:'20px', marginBottom:'0px'}}> Mi Carrito </h1>
                <div style={estiloCorreo}>({correo})</div>

                <div>
                    <UserCardBlock
                        products={props.user.cartDetail}
                        removeItem={RemoveFromCart}
                        addItem={AddToCart}
                        subtractItem={SubtractToCart}
                        addEnvio={AddEnvio}
                    />

                    <br/>
                    <br/>

                    <hr/>
    
                    {ShowTotal ?
                        <div style={{marginTop:'3rem'}}>
                            <h2 style={{margin:'auto', textAlign:'center'}}> Total a pagar: ${Total.toString().replace(".", ",")} </h2>
                            <div style={{marginBottom:'50px'}}></div>
                        </div>
                    :
                    ShowSuccess ?
                        <Result status="success" title="Successfully Purchased Items" /> :
                        <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <br />
                            <Empty description={false} />
                            <br/>
                            <h2 style={{textAlign:'center'}}> No hay nada en tu carrito </h2>
                        </div>
                    }
                </div>
    
    
                {ShowTotal &&
    
                    <div style={{display:'block', margin:'auto', textAlign:'center'}}>
                        <a onClick={pagarMP} style={{backgroundColor:'white', border:'0px solid white'}}>
                            <h4>Click para pagar desde</h4>
                            <img src="/imgs/mercadopago.png" style={{maxWidth:'80%'}} />
                            <h6 style={{marginTop:'12px'}}> No es necesario tener una cuenta en Mercado Pago </h6>
                        </a>

                    </div>
                }
    
                <br/><br/><br/><br/><br/>
                <br/>
                <p style={{textAlign:'center', marginBottom:'10px', paddingBottom:'0'}}>Ver <a href={'/politica-de-devoluciones'}>Política de Devoluciones</a></p>

            </div>
        )
    } else {
        return (<div></div>)
    }
}


export default CartPage
