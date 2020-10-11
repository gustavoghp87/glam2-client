import React, { Suspense } from 'react'
import { Route, Switch } from "react-router-dom"
import Auth from "../hoc/auth"
import LandingPage from "./views/LandingPage/LandingPage.js"
import ServicesPage from "./views/ServicesPage/ServicesPage.js"
import ProductsPage from './views/ProductsPage/ProductsPage.js'
import LoginPage from "./views/LoginPage/LoginPage.js"
import RegisterPage from "./views/LoginPage/RegisterPage.js"
import NavBar from "./views/NavBar/NavBar"
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage'
import CartPage from './views/CartPage/CartPage'
import HistoryPage from './views/HistoryPage/HistoryPage'
import SalesPage from './views/SalesPage/SalesPage'
import PolicyPage from './views/LoginPage/PolicyPage'
import UsePage from './views/LoginPage/UsePage'
import ReturnsPage from './views/LoginPage/ReturnsPage'
import { useSelector } from 'react-redux'


function App() {

  const { ColorPrimary, ColorSecundary, ColorFont, darkMode } = useSelector(state => state.mode)
  const mobile = window.screen.width<787 ? true : false
  const appCss = {
    backgroundColor: ColorPrimary,
    maxWidth: '100%',
    margin: '0 auto',
    padding: mobile ? '25px 0 0 0' : '100px 0 0 0',
    minHeight: 'calc(100vh - 80px)'
  }


  return (
    <Suspense fallback={(<div>Cargando...</div>)}>
      <NavBar ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} darkMode={darkMode} mobile={mobile} />
      <div style={appCss}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/servicios" component={Auth(ServicesPage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/productos" component={Auth(ProductsPage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/login" component={Auth(LoginPage, false)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/politica-de-privacidad" component={Auth(PolicyPage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/condiciones-de-uso" component={Auth(UsePage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/politica-de-devoluciones" component={Auth(ReturnsPage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/registro" component={Auth(RegisterPage, false)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          {/* <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} /> */}
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/ventas" component={Auth(SalesPage, true)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
          <Route exact path="/history" component={Auth(HistoryPage, true)} ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
        </Switch>
      </div>
      <Footer ColorPrimary={ColorPrimary} ColorSecundary={ColorSecundary} ColorFont={ColorFont} mobile={mobile} />
    </Suspense>
  )
}

export default App
