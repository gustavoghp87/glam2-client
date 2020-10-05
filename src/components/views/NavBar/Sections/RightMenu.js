import React from 'react'
import { Menu, Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import { useSelector } from "react-redux"
import { ShoppingCartOutlined } from '@ant-design/icons'
import { UploadOutlined } from '@ant-design/icons'
import { logoutUser } from '../../../../_actions/user_actions'


function RightMenu(props) {

  const user = useSelector(state => state.user)

  var numCarrito = 0

  const reCarrito = () => {
    try {
      numCarrito = 0;
      user.userData.cart.forEach(element => {
        numCarrito += element.quantity
      })
    } catch(e) {}
  }

  reCarrito()

  const logoutHandler = () => {
    logoutUser()
    window.location.href = '/login'
  }

  const renderEmail = () => {
    try {
      return user.userData.email
    } catch(e) {}
  }


  let estiloHistory1 = {display:'block'}
  let estiloHistory2 = {display:'none'}
  var subir1 = {display:'block'}
  var subir2 = {display:'none'}
  let estiloEmail = {display:'none'}
  let estiloVentas = {display:'block'}
  let badge = {marginRight: -9, color:'#667777'}
  try {
    if (window.screen.width>767 && window.screen.width<=1000) {
      estiloHistory1 = {display:'none'}
      estiloHistory2 = {display:'block'}
    }
  } catch(e) {}
  try {
    if (window.screen.width>767 && window.screen.width<880) {
      subir1 = {display:'none'}
      subir2 = {display:'block'}
      estiloVentas = {display:'none'}
    }
  } catch(e) {}
  try {
    if (window.screen.width<=767) {
      estiloEmail = {display:'block'}
      badge = {marginRight: -10, color:'#667777'}
    }
  } catch(e) {}

  // <Menu.Item key="1" icon={<MailOutlined />}></Menu.Item>
  //console.log(user.userData)

  
  if (user.userData && user.userData.isAuth && user.userData.isAdmin) {

    return (
      <Menu mode={props.mode}>
        <Menu.Item key="3">
          <a href="/ventas" style={estiloVentas}> Ventas </a>
        </Menu.Item>
        <hr id="navbarInv" />

        <Menu.Item key="4">
          <a href="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/>Subir</a>
          <a href="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/></a>
        </Menu.Item>
        <hr id="navbarInv" />

        <Menu.Item key="5">
          <a href="/history" style={estiloHistory1} id="compras1">Historial de Compras</a>
          <a href="/history" style={estiloHistory2} id="compras2">Compras</a>
        </Menu.Item>
        <hr id="navbarInv" />

        <Menu.Item key="6" id="cart" style={{padding:'0px 0px 0px 0px !important'}}>
          <Badge count={user.userData && numCarrito}>

            <a href="/user/cart" style={badge}>
              <ShoppingCartOutlined style={{fontSize:30}}/>
            </a>
          </Badge>

          <span id="navbarInv2"> &nbsp; &nbsp; &nbsp; Mi Carrito </span>
        </Menu.Item>
        <hr id="navbarInv" />

        <Menu.Item key="7" style={estiloEmail}>
          <div>
            {renderEmail()}
          </div>
        </Menu.Item>
        <hr id="navbarInv" />
        
        <Menu.Item key="8">
          <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
        </Menu.Item>
        <hr id="navbarInv"/>
      </Menu>
    )
  } else if (user.userData && user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="9">
          <a href="/history" style={estiloHistory1} id="compras1">Historial de Compras</a>
          <a href="/history" style={estiloHistory2} id="compras2">Compras</a>
        </Menu.Item>
        <hr id="navbarInv" />

        <Menu.Item key="10" id="cart" style={{padding:'0px 0px 0px 0px !important'}}>
          <Badge count={user.userData && numCarrito}>

            <a href="/user/cart" style={badge}>
              <ShoppingCartOutlined style={{fontSize:30}}/>
            </a>
          </Badge>

          <span id="navbarInv2"> &nbsp; &nbsp; &nbsp; Mi Carrito </span>
        </Menu.Item>
        <hr id="navbarInv" />

        <Menu.Item key="11">
          <div style={estiloEmail}>
            {renderEmail()}
          </div>
        </Menu.Item>
        <hr id="navbarInv" />
        
        <Menu.Item key="12">
          <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
        </Menu.Item>
        <hr id="navbarInv"/>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="1">
          <a href="/login">Iniciar Sesión</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/registro">Registrarse</a>
        </Menu.Item>
      </Menu>
    )
  }
  
}


export default withRouter(RightMenu)
