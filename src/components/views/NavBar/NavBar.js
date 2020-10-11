import React, { useState } from 'react'
import { Drawer, Button, Menu, Badge } from 'antd'
import './Navbar.css'
import MenuIcon from '@material-ui/icons/Menu'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons'
import { logoutUser, changeMode } from '../../../_actions/user_actions'
import { VscColorMode } from 'react-icons/vsc'
import { mobile } from '../../App'


function NavBar(props) {

  const user = useSelector(state => state.user)
  const mode = useSelector(state => state.mode)
  const dispatch = useDispatch()

  const estiloBarra = {backgroundColor: props.ColorPrimary}
  const estiloMenuContainer = {backgroundColor: props.ColorPrimary}
  const [visible, setVisible] = useState(false)
  const showDrawer = () => { setVisible(true) }
  const onClose = () => { setVisible(false) }

  const handleColor = () => {dispatch(changeMode(!props.darkMode))}

  const renderEmailFloat = () => {
    try {
      return (
        <div style={{overflow:'hidden', textAlign:'center', padding:'0', margin:'0', position:'fixed', left:'10px', bottom:'1.5%', zIndex:'5'}}>
          <h6 style={{textAlign:'center', color:props.ColorFont}}> {user.userData.email} </h6>
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


  let estiloHistory1 = {display:'block', color:props.ColorFont, fontWeight:'600'}
  let estiloHistory2 = {display:'none'}
  var subir1 = {display:'block', color:props.ColorFont, fontWeight:'600'}
  var subir2 = {display:'none'}
  let estiloVentas = {display:'block', color:props.ColorFont, fontWeight:'600'}
  let badge = {marginRight: -9, color:'#667777'}
  try {
    if (window.screen.width>899 && window.screen.width<=1000) {
      estiloHistory1 = {display:'none'}
      estiloHistory2 = {display:'block', color:props.ColorFont, fontWeight:'600'}
      subir1 = {display:'none'}
      subir2 = {display:'block', color:props.ColorFont}
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
      <Menu mode={"horizontal"} style={{backgroundColor:props.ColorPrimary}}>

        {user.userData && user.userData.isAuth && user.userData.isAdmin &&
        <>
          <Menu.Item>
            <Link to="/ventas" style={estiloVentas}> Ventas </Link>
          </Menu.Item>
  
          <Menu.Item>
            <Link to="/product/upload" style={subir1}> <UploadOutlined style={{fontSize:25}}/> Subir </Link>
            <Link to="/product/upload" style={subir2}> <UploadOutlined style={{fontSize:25}}/> </Link>
          </Menu.Item>
        </>
        }

        {user.userData && user.userData.isAuth
        ?
          <>
          <Menu.Item>
            <Link to="/history" style={estiloHistory1}> Historial de Compras </Link>
            <Link to="/history" style={estiloHistory2}> Compras </Link>
          </Menu.Item>
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
  
              <span style={{fontWeight:'600', color:props.ColorFont}}> Mi Carrito &nbsp; </span>

              <Link to="/user/cart" style={badge}>
                <ShoppingCartOutlined style={{fontSize:30, color:props.ColorFont}}/>
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
              <Link style={{color:props.ColorFont}} to="/login"> Iniciar Sesión </Link>
            </Menu.Item>
            <Menu.Item>
              <Link style={{color:props.ColorFont}} to="/registro">Registrarse</Link>
            </Menu.Item>
          </>
        }

      </Menu>
    )
  }




  const menuDerechoMobile = () => {
    return (
      <Menu mode={"inline"} style={{backgroundColor:props.ColorPrimary}}>
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
            <Link to="/history" style={estiloHistory1} id="compras1"> Historial de Compras </Link>
            <Link to="/history" style={estiloHistory2} id="compras2"> Compras </Link>
          </Menu.Item>
          <hr />
  
          <Menu.Item id="cart">
            <Badge count={user.userData && numCarrito}>
              <span style={{fontWeight:'600', color:props.ColorFont}}> Mi Carrito &nbsp; </span>
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
            <a onClick={logoutHandler} style={{color:'red'}}> Cerrar Sesión </a>
          </Menu.Item>
          <hr />
        </>
        :
        <>
          <Menu.Item>
            <Link style={{color:props.ColorFont}} to="/login"> Iniciar Sesión </Link>
          </Menu.Item>
          <Menu.Item>
            <Link style={{color:props.ColorFont}} to="/registro"> Registrarse </Link>
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
              <Menu mode={"horizontal"} style={{backgroundColor:props.ColorPrimary}}>
                <Menu.Item>
                  <Link to="/servicios"> <span style={{fontWeight:'600', color:props.ColorFont}}>Servicios</span> </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/productos"> <span style={{fontWeight:'600', color:props.ColorFont}}>Productos</span> </Link>
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
            
            <Button className="menu__mobile-button" type={props.darkMode ? "dark" : "light"} onClick={showDrawer}>
              <MenuIcon />
            </Button>

            <div style={{backgroundColor:props.ColorPrimary}}>

              <Drawer
                title="Navegación"
                placement="right"
                className="menu_drawer"
                closable={false}
                onClose={onClose}
                visible={visible}
              >

                <Menu mode={"inline"} style={{backgroundColor:props.ColorPrimary}}>
                  <Menu.Item>
                    <Link to="/servicios"> <span style={{fontWeight:'600', color:props.ColorFont}}>
                      Servicios </span>
                    </Link>
                  </Menu.Item>

                  <hr />

                  <Menu.Item>
                    <Link to="/productos"> <span style={{fontWeight:'600', color:props.ColorFont}}>
                      Productos </span>
                    </Link>
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

      {
      <>
        <a style={{
          textAlign: 'center', 
          padding: '0', 
          margin: '0', 
          position: props.mobile ? 'absolute' : 'fixed', 
          left: '10px', 
          top: props.mobile ? '80px' : '80px', 
          zIndex: '2', 
          color: props.ColorFont,

          }}
          onClick={() => {handleColor()}}
        >
          <VscColorMode /> {props.darkMode ? `Modo Claro` : `Modo Oscuro`}
        </a>

        
        <div style={{
          width: '80px',
          overflow: 'hidden',
          color: '#fff',
          textAlign: 'center',
          padding: '0',
          margin: '0',
          position: 'fixed',
          right: '0',
          bottom: '1.5%',
          zIndex: '25'
          }}>

            <a className="demo-button"
              href="https://api.whatsapp.com/send?phone=5491169575866&amp;source=&amp;data="
              target="_blank" rel="noopener noreferrer" data-animate="fadeInRight" data-animated="true"
            >

              <img style={{width:'50px', marginBottom:'5px'}}
                src="https://glamstudio.com.ar/imgs/whatsapp.png"
              />

              <h6 style={{textAlign:'center', color:props.ColorFont}}> Consultas y turnos </h6>

            </a>
        </div>
      </>
      }
    </>
  )
}


export default NavBar
