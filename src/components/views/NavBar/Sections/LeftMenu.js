import React from 'react'
import { Menu } from 'antd'

function LeftMenu(props) {

  return (
    <Menu mode={props.mode}>
      <Menu.Item>
        <a href="/servicios"> <span style={{fontWeight:'600'}}>Servicios</span> </a>
      </Menu.Item>
      <hr id="navbarInv" />

      <Menu.Item>
        <a href="/productos"> <span style={{fontWeight:'600'}}>Productos</span> </a>
      </Menu.Item>
      <hr id="navbarInv" />

      <Menu.SubMenu title={<span>Menú</span>} style={{display:'none'}}>
        <Menu.ItemGroup title="Shopping" style={{color:'#40a9ff', fontWeight:800}}>
          <a href="/servicios">
            <Menu.Item style={{paddingLeft:'18%', paddingTop:'5z%', paddingBottom:'8%', fontWeight:400}}>Servicios</Menu.Item> 
          </a>
          <a href="/productos">
            <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'8%', fontWeight:400}}>Productos</Menu.Item> 
          </a>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="GlamStudio" style={{color:'#40a9ff', fontWeight:800}}>
          <a href="/quienes">
            <Menu.Item style={{paddingLeft:'18%', paddingTop:'5%', paddingBottom:'8%', fontWeight:400}}>Quiénes somos</Menu.Item> 
          </a>
          <a href="/envios">
            <Menu.Item style={{paddingLeft:'18%', paddingTop:'10%', paddingBottom:'15%', fontWeight:400}}>Envíos</Menu.Item>
          </a>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <hr id="navbarInv" style={{display:'none'}} />

    </Menu>
  )
}


export default LeftMenu
