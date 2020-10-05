import React, { useState } from 'react'
import { Drawer, Button, Menu, Badge } from 'antd'
import './Sections/Navbar.css'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { USER_SERVER } from '../../../hoc/Config'
import { ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons'


function NavBar(props) {

  const [visible, setVisible] = useState(false)

  const showDrawer = () => { setVisible(true) }

  const onClose = () => { setVisible(false) }

  const user = useSelector(state => state.user)

  const renderEmailFloat = () => {
    try {
      return (
        <div style={{overflow:'hidden', color:'#fff', textAlign:'center', padding:'0', margin:'0', position:'fixed', left:'10px', bottom:'1.5%', zIndex:'25'}}>
          <h6 style={{textAlign:'center', color:'gray'}}> {user.userData.email} </h6>
        </div>
      )
    } catch(e) {}
  }

  const renderEmail = () => { try { return (user.userData.email) } catch(e) {} }

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
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        //props.history.push("/login");
        window.location.href = '/login'
      } else {
        alert('Falló la salida')
      }
    })
  }



  let estiloHistory1 = {display:'block', color:'#ffffff'}
  let estiloHistory2 = {display:'none'}
  var subir1 = {display:'block', color:'#ffffff'}
  var subir2 = {display:'none'}
  let estiloVentas = {display:'block', color:'#ffffff'}
  let badge = {marginRight: -9, color:'#667777'}
  try {
    if (window.screen.width>899 && window.screen.width<=1000) {
      estiloHistory1 = {display:'none'}
      estiloHistory2 = {display:'block', color:'#ffffff'}
      subir1 = {display:'none'}
      subir2 = {display:'block', color:'#ffffff'}
      estiloVentas = {display:'none'}
    }
  } catch(e) {}
  try {
    if (window.screen.width<=899) {
      badge = {marginRight: -10, color:'#667777'}
    }
  } catch(e) {}



  const menuDerechoDesktop = () => {
    if (user.userData && user.userData.isAuth && user.userData.isAdmin) {
      return (
        <Menu mode={"horizontal"}>
          <Menu.Item>
            <Link to="/ventas" style={estiloVentas}> Ventas </Link>
          </Menu.Item>
  
          <Menu.Item>
            <Link to="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/>Subir</Link>
            <Link to="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/></Link>
          </Menu.Item>

          <Menu.Item>
            <a href="/history" style={estiloHistory1} id="compras1">Historial de Compras</a>
            <a href="/history" style={estiloHistory2} id="compras2">Compras</a>
          </Menu.Item>
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
  
              <span> Mi Carrito &nbsp; </span>

              <a href="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </a>
            </Badge>
          
          </Menu.Item>
          
          <Menu.Item>
            <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
          </Menu.Item>
        </Menu>
      )
    } else if (user.userData && user.userData.isAuth) {
      return (
        <Menu mode={"horizontal"}>
  
          <Menu.Item>
            <a href="/history" style={estiloHistory1} id="compras1">Historial de Compras</a>
            <a href="/history" style={estiloHistory2} id="compras2">Compras</a>
          </Menu.Item>
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
  
              <span> Mi Carrito &nbsp; </span>

              <a href="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </a>
            </Badge>

          </Menu.Item>
          
          <Menu.Item>
            <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
          </Menu.Item>
        </Menu>
      )
    } else {
      return (
        <Menu mode={"horizontal"}>
          <Menu.Item>
            <a style={{color:'#ffffff'}} href="/login"> Iniciar Sesión </a>
          </Menu.Item>
          <Menu.Item>
            <a style={{color:'#ffffff'}} href="/registro">Registrarse</a>
          </Menu.Item>
        </Menu>
      )
    }
  }




  const menuDerechoMobile = () => {
    if (user.userData && user.userData.isAuth && user.userData.isAdmin) {
      return (
        <Menu mode={"inline"}>
          <Menu.Item>
            <a href="/ventas" style={estiloVentas}> Ventas </a>
          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <a href="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/>Subir</a>
            <a href="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/></a>
          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <a href="/history" style={estiloHistory1} id="compras1">Historial de Compras</a>
            <a href="/history" style={estiloHistory2} id="compras2">Compras</a>
          </Menu.Item>
          <hr />
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>

              <span> Mi Carrito &nbsp; </span>

              <a href="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </a>
            </Badge>
  
          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <div> {renderEmail()} </div>
          </Menu.Item>
          <hr />
          
          <Menu.Item>
            <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
          </Menu.Item>
          <hr />
        </Menu>
      )
    } else if (user.userData && user.userData.isAuth) {
      return (
        <Menu mode={"inline"}>
  
          <Menu.Item>
            <a href="/history" style={estiloHistory1} id="compras1">Historial de Compras</a>
            <a href="/history" style={estiloHistory2} id="compras2">Compras</a>
          </Menu.Item>
          <hr />
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>

              <span> Mi Carrito &nbsp; </span>
  
              <a href="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </a>
            </Badge>

          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <div> {renderEmail()} </div>
          </Menu.Item>
          <hr />
          
          <Menu.Item>
            <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
          </Menu.Item>
          <hr />
        </Menu>
      )
    } else {
      return (
        <Menu mode={"inline"}>
          <Menu.Item>
            <a style={{color:'#ffffff'}} href="/login">Iniciar Sesión</a>
          </Menu.Item>
          <Menu.Item>
            <a style={{color:'#ffffff'}} href="/registro">Registrarse</a>
          </Menu.Item>
        </Menu>
      )
    }
  }



  const renderNavbar = () => {
    if (window.screen.width>899) {
      return (
      <div>
        <nav className="menu" style={{position:'fixed', zIndex:5, width:'100%'}} id="barra">
          
          <div className="menu__logo">
            <a href="/" style={{color:'violet'}}> GlamStudio </a>
          </div>
          
          <div className="menu__container" style={{paddingTop:'5px'}}>
            
            <div className="menu_left">
              <Menu mode={"horizontal"}>
                <Menu.Item>
                  <a href="/servicios"> <span style={{fontWeight:'600', color:'#ffffff'}}>Servicios</span> </a>
                </Menu.Item>

                <Menu.Item>
                  <a href="/productos"> <span style={{fontWeight:'600', color:'#ffffff'}}>Productos</span> </a>
                </Menu.Item>

                <Menu.SubMenu title={<span>Menú</span>} style={{display:'none'}}>
                  <Menu.ItemGroup title="Shopping" style={{color:'#40a9ff', fontWeight:800}}>
                    <a href="/servicios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:'#ffffff'}}>Servicios</Menu.Item> 
                    </a>
                    <a href="/productos">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'8%', fontWeight:400, color:'#ffffff'}}>Productos</Menu.Item> 
                    </a>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="GlamStudio" style={{color:'#40a9ff', fontWeight:800}}>
                    <a href="/quienes">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:'#ffffff'}}>Quiénes somos</Menu.Item> 
                    </a>
                    <a href="/envios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'15%', fontWeight:400, color:'#ffffff'}}>Envíos</Menu.Item>
                    </a>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
                
              </Menu>
            </div>
            
            <div className="menu_right">
              {menuDerechoDesktop()}
            </div>
            
          </div>
        </nav>

        <div> {renderEmailFloat()} </div>

      </div>
      )
    } else {
      return (
      <div>
        <nav className="menu" style={{position:'fixed', zIndex:5, width:'100%'}} id="barra">
          
          <div className="menu__logo">
            <a href="/" style={{color:'violet'}}> GlamStudio </a>
          </div>
          
          <div className="menu__container" style={{paddingTop:'5px'}}>
            
            <Button className="menu__mobile-button" type="dark" onClick={showDrawer}>
              <MenuIcon />
            </Button>
            
            <Drawer
              title="Navegación"
              placement="right"
              className="menu_drawer"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Menu mode={"inline"}>
                <Menu.Item>
                  <a href="/servicios"> <span style={{fontWeight:'600', color:'#ffffff'}}>Servicios</span> </a>
                </Menu.Item>
                <hr />

                <Menu.Item>
                  <a href="/productos"> <span style={{fontWeight:'600', color:'#ffffff'}}>Productos</span> </a>
                </Menu.Item>
                <hr />

                <Menu.SubMenu title={<span>Menú</span>} style={{display:'none'}}>
                  <Menu.ItemGroup title="Shopping" style={{color:'#40a9ff', fontWeight:800}}>
                    <a href="/servicios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:'#ffffff'}}>Servicios</Menu.Item> 
                    </a>
                    <a href="/productos">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'8%', fontWeight:400, color:'#ffffff'}}>Productos</Menu.Item> 
                    </a>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="GlamStudio" style={{color:'#40a9ff', fontWeight:800}}>
                    <a href="/quienes">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:'#ffffff'}}>Quiénes somos</Menu.Item> 
                    </a>
                    <a href="/envios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'15%', fontWeight:400, color:'#ffffff'}}>Envíos</Menu.Item>
                    </a>
                  </Menu.ItemGroup>
                </Menu.SubMenu>

              </Menu>
              {menuDerechoMobile()}
            </Drawer>
          </div>
        </nav>

        <div> {renderEmailFloat()} </div>

      </div>
      )
    }
  }



  return (
    <>
      {renderNavbar()}
    </>
  )
}


export default NavBar
