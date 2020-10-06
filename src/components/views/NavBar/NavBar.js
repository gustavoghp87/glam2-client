import React, { useState, useEffect } from 'react'
import { Drawer, Button, Menu, Badge } from 'antd'
import './Sections/Navbar.css'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons'
import { logoutUser, changeMode } from '../../../_actions/user_actions'
import { VscColorMode } from 'react-icons/vsc'


export let darkMode = false
export const ColorPrimary = darkMode ? "#000000" : "#ffffff"
export const ColorSecundary = darkMode ? "#18191a" : "lightgray"
export const ColorFont = darkMode ? "#ffffff" : '#000000'

function NavBar() {

  const user = useSelector(state => state.user)
  const mode = useSelector(state => state.mode)
  const dispatch = useDispatch()

  const [DarkMode, setDarkMode] = useState(false)
  const [ColorPrimary, setColorPrimary] = useState(mode.ColorPrimary)
  const [ColorSecundary, setColorSecundary] = useState(mode.ColorSecundary)
  const [ColorFont, setColorFont] = useState(mode.ColorFont)

  const estiloBarra = {backgroundColor: ColorPrimary}
  const estiloMenuContainer = {backgroundColor: ColorPrimary}
  const [visible, setVisible] = useState(false)
  const showDrawer = () => { setVisible(true) }
  const onClose = () => { setVisible(false) }

  useEffect(() => {
    let local = localStorage.getItem("mode")
    local='true' ? local=true : local=false
    console.log("local", local)

    setColorPrimary(mode.ColorPrimary)
    setColorSecundary(mode.ColorSecundary)
    setColorFont(mode.ColorFont)
    setDarkMode(mode.darkMode)
  }, [mode, DarkMode])
  console.log(DarkMode, mode.darkMode, localStorage.getItem("mode"))



  const renderEmailFloat = () => {
    try {
      return (
        <div style={{overflow:'hidden', textAlign:'center', padding:'0', margin:'0', position:'fixed', left:'10px', bottom:'1.5%', zIndex:'25'}}>
          <h6 style={{textAlign:'center', color:'gray'}}> {user.userData.email} </h6>
        </div>
      )
    } catch(e) {}
  }

  const renderEmail = () => { try { return (user.userData.email) } catch(e) {} }

  let numCarrito = 0
  const reCarrito = () => {
    try {
      numCarrito = 0
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


  let estiloHistory1 = {display:'block', color:ColorFont, fontWeight:'600'}
  let estiloHistory2 = {display:'none'}
  var subir1 = {display:'block', color:ColorFont, fontWeight:'600'}
  var subir2 = {display:'none'}
  let estiloVentas = {display:'block', color:ColorFont, fontWeight:'600'}
  let badge = {marginRight: -9, color:'#667777'}
  try {
    if (window.screen.width>899 && window.screen.width<=1000) {
      estiloHistory1 = {display:'none'}
      estiloHistory2 = {display:'block', color:ColorFont, fontWeight:'600'}
      subir1 = {display:'none'}
      subir2 = {display:'block', color:ColorFont}
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
            <Link to="/history" style={estiloHistory1}>Historial de Compras</Link>
            <Link to="/history" style={estiloHistory2}>Compras</Link>
          </Menu.Item>
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
  
              <span style={{fontWeight:'600'}}> Mi Carrito &nbsp; </span>

              <Link to="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </Link>
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
            <Link to="/history" style={estiloHistory1}>Historial de Compras</Link>
            <Link to="/history" style={estiloHistory2}>Compras</Link>
          </Menu.Item>
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
  
              <span style={{fontWeight:'600'}}> Mi Carrito &nbsp; </span>

              <Link to="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </Link>
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
            <Link style={{color:ColorFont}} to="/login"> Iniciar Sesión </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{color:ColorFont}} to="/registro">Registrarse</Link>
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
            <Link to="/ventas" style={estiloVentas}> Ventas </Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <Link to="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/>Subir</Link>
            <Link to="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/></Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <Link to="/history" style={estiloHistory1} id="compras1">Historial de Compras</Link>
            <Link to="/history" style={estiloHistory2} id="compras2">Compras</Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>

              <span style={{fontWeight:'600'}}> Mi Carrito &nbsp; </span>

              <Link to="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </Link>
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
            <Link to="/history" style={estiloHistory1} id="compras1">Historial de Compras</Link>
            <Link to="/history" style={estiloHistory2} id="compras2">Compras</Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>

              <span style={{fontWeight:'600'}}> Mi Carrito &nbsp; </span>
  
              <Link to="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </Link>
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
            <Link style={{color:ColorFont}} to="/login">Iniciar Sesión</Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{color:ColorFont}} to="/registro">Registrarse</Link>
          </Menu.Item>
        </Menu>
      )
    }
  }



  const renderNavbar = () => {
    if (window.screen.width>899) {
      return (
      <>
      <div style={{position:'fixed', top:'0', width:'100%', zIndex:2}}>
        <nav className="menu" style={{ width:'100%'}, estiloBarra} id="barra">
          
          <div className="menu__logo">
            <Link to="/" style={{color:'violet'}}> GlamStudio </Link>
          </div>
          
          <div className="menu__container" style={{paddingTop:'5px'}}>
            
            <div className="menu_left">
              <Menu mode={"horizontal"}>
                <Menu.Item>
                  <Link to="/servicios"> <span style={{fontWeight:'600', color:ColorFont}}>Servicios</span> </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link to="/productos"> <span style={{fontWeight:'600', color:ColorFont}}>Productos</span> </Link>
                </Menu.Item>

                <Menu.SubMenu title={<span>Menú</span>} style={{display:'none'}}>
                  <Menu.ItemGroup title="Shopping" style={{color:'#40a9ff', fontWeight:800}}>
                    <Link to="/servicios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:ColorFont}}>Servicios</Menu.Item> 
                    </Link>
                    <Link to="/productos">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'8%', fontWeight:400, color:ColorFont}}>Productos</Menu.Item> 
                    </Link>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="GlamStudio" style={{color:'#40a9ff', fontWeight:800}}>
                    <Link to="/quienes">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:ColorFont}}>Quiénes somos</Menu.Item> 
                    </Link>
                    <Link to="/envios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'15%', fontWeight:400, color:ColorFont}}>Envíos</Menu.Item>
                    </Link>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
                
              </Menu>
            </div>
            
            <div className="menu_right">
              {menuDerechoDesktop()}
            </div>
            
          </div>
        </nav>
        </div>

        <div> {renderEmailFloat()} </div>
      </>
      )
    } else {
      return (
      <div>
        <nav className="menu" style={{position:'fixed', zIndex:5, width:'100%'}, estiloBarra} id="barra">
          
          <div className="menu__logo">
            <Link to="/" style={{color:'violet'}}> GlamStudio </Link>
          </div>
          
          <div className="menu__container" style={{paddingTop:'5px'}, estiloMenuContainer}>
            
            <Button className="menu__mobile-button" type={darkMode ? "dark" : "light"} onClick={showDrawer}>
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
                  <Link to="/servicios"> <span style={{fontWeight:'600', color:ColorFont}}>Servicios</span> </Link>
                </Menu.Item>
                <hr />

                <Menu.Item>
                  <Link to="/productos"> <span style={{fontWeight:'600', color:ColorFont}}>Productos</span> </Link>
                </Menu.Item>
                <hr />

                <Menu.SubMenu title={<span>Menú</span>} style={{display:'none'}}>
                  <Menu.ItemGroup title="Shopping" style={{color:'#40a9ff', fontWeight:800}}>
                    <Link to="/servicios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:ColorFont}}>Servicios</Menu.Item> 
                    </Link>
                    <Link to="/productos">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'8%', fontWeight:400, color:ColorFont}}>Productos</Menu.Item> 
                    </Link>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="GlamStudio" style={{color:'#40a9ff', fontWeight:800}}>
                    <Link to="/quienes">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400, color:ColorFont}}>Quiénes somos</Menu.Item> 
                    </Link>
                    <Link to="/envios">
                      <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'15%', fontWeight:400, color:ColorFont}}>Envíos</Menu.Item>
                    </Link>
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

      {window.screen.width>787 &&
        <a style={{textAlign:'center', padding:'0', margin:'0', position:'fixed', left:'10px', top:'80px', zIndex:'25', color:ColorFont}} onClick={() => {
          dispatch(changeMode(!DarkMode))
          localStorage.setItem("mode", !DarkMode)
        }
        }>
          <VscColorMode /> {mode.darkMode ? `Modo Claro` : `Modo Oscuro`}
        </a>
      }
    </>
  )
}


export default NavBar
