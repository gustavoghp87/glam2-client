import React, { useState, useEffect } from 'react'
import { Drawer, Button, Menu, Badge } from 'antd'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons'
import { logoutUser, changeMode } from '../../../_actions/user_actions'
import { VscColorMode } from 'react-icons/vsc'


function NavBar() {

  const user = useSelector(state => state.user)
  const mode = useSelector(state => state.mode)
  const dispatch = useDispatch()

  const [DarkMode, setDarkMode] = useState(mode.darkMode)
  const [ColorPrimary, setColorPrimary] = useState(mode.ColorPrimary)
  const [ColorSecundary, setColorSecundary] = useState(mode.ColorSecundary)
  const [ColorFont, setColorFont] = useState(mode.ColorFont)

  const estiloBarra = {backgroundColor: ColorPrimary}
  const estiloMenuContainer = {backgroundColor: ColorPrimary}
  const [visible, setVisible] = useState(false)
  const showDrawer = () => { setVisible(true) }
  const onClose = () => { setVisible(false) }

  useEffect(() => {
    setColorPrimary(mode.ColorPrimary)
    setColorSecundary(mode.ColorSecundary)
    setColorFont(mode.ColorFont)
  }, [DarkMode])

  console.log(DarkMode, mode.darkMode)
  console.log("Colores:", ColorPrimary, ColorSecundary, ColorFont)

  const handleColor = () => {
    dispatch(changeMode(!DarkMode))
    setDarkMode(!DarkMode)
  }

  const renderEmailFloat = () => {
    try {
      return (
        <div style={{overflow:'hidden', textAlign:'center', padding:'0', margin:'0', position:'fixed', left:'10px', bottom:'1.5%', zIndex:'5'}}>
          <h6 style={{textAlign:'center', color:ColorFont}}> {user.userData.email} </h6>
        </div>
      )
    } catch {}
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

    return (
      <Menu mode={"horizontal"} style={{backgroundColor:ColorPrimary}}>

        {user.userData && user.userData.isAuth && user.userData.isAdmin &&
        <>
          <Menu.Item>
            <Link to="/ventas" style={estiloVentas}> Ventas </Link>
          </Menu.Item>
  
          <Menu.Item>
            <Link to="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/>Subir</Link>
            <Link to="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/></Link>
          </Menu.Item>
        </>
        }

        {user.userData && user.userData.isAuth
        ?
          <>
          <Menu.Item>
            <Link to="/history" style={estiloHistory1}>Historial de Compras</Link>
            <Link to="/history" style={estiloHistory2}>Compras</Link>
          </Menu.Item>
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
  
              <span style={{fontWeight:'600', color:ColorFont}}> Mi Carrito &nbsp; </span>

              <Link to="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30}}/>
              </Link>
            </Badge>
          
          </Menu.Item>
          
          <Menu.Item>
            <a onClick={logoutHandler} style={{color:'red'}}>Cerrar Sesión</a>
          </Menu.Item>
          </>
        :
          <>
            <Menu.Item>
              <Link style={{color:ColorFont}} to="/login"> Iniciar Sesión </Link>
            </Menu.Item>
            <Menu.Item>
              <Link style={{color:ColorFont}} to="/registro">Registrarse</Link>
            </Menu.Item>
          </>
        }

      </Menu>
    )
  }




  const menuDerechoMobile = () => {
    return (
      <Menu mode={"inline"} style={{backgroundColor:ColorPrimary}}>
        {user.userData && user.userData.isAuth && user.userData.isAdmin &&
        <>
          <Menu.Item>
            <Link to="/ventas" style={estiloVentas}> Ventas </Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item>
            <Link to="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/>Subir</Link>
            <Link to="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/></Link>
          </Menu.Item>
          <hr />
        </>
        }

        {user && user.userData && user.userData.isAuth
        ?
        <>
          <Menu.Item>
            <Link to="/history" style={estiloHistory1} id="compras1">Historial de Compras</Link>
            <Link to="/history" style={estiloHistory2} id="compras2">Compras</Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
              <span style={{fontWeight:'600', color:ColorFont}}> Mi Carrito &nbsp; </span>
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
        </>
        :
        <>
          <Menu.Item>
            <Link style={{color:ColorFont}} to="/login">Iniciar Sesión</Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{color:ColorFont}} to="/registro">Registrarse</Link>
          </Menu.Item>
        </>
        }
      </Menu>
    )
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
              <Menu mode={"horizontal"} style={{backgroundColor:ColorPrimary}}>
                <Menu.Item>
                  <Link to="/servicios"> <span style={{fontWeight:'600', color:ColorFont}}>Servicios</span> </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/productos"> <span style={{fontWeight:'600', color:ColorFont}}>Productos</span> </Link>
                </Menu.Item>                
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
            
            <Button className="menu__mobile-button" type={DarkMode ? "dark" : "light"} onClick={showDrawer}>
              <MenuIcon />
            </Button>

            <div style={{backgroundColor:ColorPrimary}}>
            <Drawer
              title="Navegación"
              placement="right"
              className="menu_drawer"
              closable={false}
              onClose={onClose}
              visible={visible}
            >

              <Menu mode={"inline"} style={{backgroundColor:ColorPrimary}}>
                <Menu.Item>
                  <Link to="/servicios"> <span style={{fontWeight:'600', color:ColorFont}}>Servicios</span> </Link>
                </Menu.Item>
                <hr />

                <Menu.Item>
                  <Link to="/productos"> <span style={{fontWeight:'600', color:ColorFont}}>Productos</span> </Link>
                </Menu.Item>
                <hr />

              </Menu>
              {menuDerechoMobile()}
            </Drawer>
            </div>
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
        <a style={{textAlign:'center', padding:'0', margin:'0', position:'fixed', left:'10px', top:'80px', zIndex:'25', color:ColorFont}} onClick={() => {handleColor()}}>
          <VscColorMode /> {mode.DarkMode ? `Modo Claro` : `Modo Oscuro`}
        </a>
      }
    </>
  )
}


export default NavBar
