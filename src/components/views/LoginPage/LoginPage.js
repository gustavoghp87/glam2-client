import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { loginUser } from "../../../_actions/user_actions"
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Input, Button, Checkbox, Typography, Col } from 'antd'
import { useDispatch } from "react-redux"
import { UserOutlined, LockFilled, GooglePlusOutlined } from '@ant-design/icons'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from 'react-google-login'
import { USER_SERVER } from "../../../hoc/Config"
import { ColorSecundary, ColorFont } from '../NavBar/NavBar'


const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {setRememberMe(!rememberMe)}

  const initialEmail = localStorage
    .getItem("rememberMe") ? localStorage.getItem("rememberMe") : ''

  const responseFacebook = (response) => {
    fetch(`${USER_SERVER}/login-with-facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    }).then( res => {
      return res.json();
    }).then( json => {
      if (json.isEmail && json.verif) {
        document.cookie = `token = ${json.token}`
        if (json.newUser)
          if (json.fusion) {}
          else
            alert("Usuario nuevo")
        else {}
        window.location.href = '/productos'
      } else if (json.isEmail===false) {
        alert("No pudimos obtener tu dirección de correo usando Facebook; intenta otro método")
      } else if (json.isEmail && json.verif===false) {
        alert("No funcionó la autenticación por Facebook")
      }
    })
  }

  const responseGoogle = (response) => {
    fetch(`${USER_SERVER}/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    }).then( res => {
      return res.json()
    }).then( json => {
      if (json.isEmail && json.verif) {
        document.cookie = `token = ${json.token}`
        if (json.newUser)
          if (json.fusion) {}
          else
            alert("Usuario nuevo")
        else {}
        window.location.href = '/productos'
      } else if (json.isEmail===false) {
        alert("No pudimos obtener tu dirección de correo usando Google; intenta otro método")
      } else if (json.isEmail && json.verif===false) {
        alert("No funcionó la autenticación por Google")
      }
    })
  }

  if (window.location.pathname==='/login') {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        document.getElementById('btnLogin').click()
      }
    })
  }

  var estilo = {}
  var borde = {border:`1px solid ${ColorSecundary}`, borderRadius:'10px', padding:'40px', paddingBottom:'20px'}
  try {
    if (window.screen.width<767) {
      estilo = {minWidth: '175px'}
      borde = {border: '0px'}
    }
  } catch(e) {}


  return (
    
    <div style={{maxWidth:'600px', display:'block', margin:'30px auto 0 auto', padding:'0 5px 0 5px'}}>
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email inválido...')
          .required('Falta el email...'),
        password: Yup.string()
          .min(6, 'Al menos 6 caracteres...')
          .required('Falta la contraseña...'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          }

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.email);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/productos");
              } else {
                setFormErrorMessage('Error; revisar email y contraseña')
              }
            })
            .catch(err => {
              setFormErrorMessage('Error; revisar email y contraseña')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            })
          setSubmitting(false);
        }, 500)
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;      


        return (

          <div className="app" style={{width:'100%', justifyContent:'center ', paddingTop:'5%', display:'block', margin:'0 auto'}}>

            <div style={borde}>
              
              <Title level={1} style={{textAlign:'center', color:ColorFont}}>
                Iniciar Sesión
              </Title>
              
              <div style={{marginBottom:'30px'}}></div>
              
              <form onSubmit={handleSubmit} style={estilo} >

                <Form.Item required>
                  <Input
                    id="email"
                    prefix={<UserOutlined />}
                    placeholder="Correo electrónico"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback"> <div style={{marginBottom:'10px'}}></div> {errors.email} </div>
                  )}
                </Form.Item>

                <Form.Item required>
                  <Input.Password
                    id="password"
                    prefix={<LockFilled />}
                    placeholder="Contraseña"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'text-input error' : 'text-input'
                    }
                  />
                  {errors.password && touched.password && (
                    <div className="input-feedback"> <div style={{marginBottom:'10px'}}></div> {errors.password}</div>
                  )}
                </Form.Item>

                {formErrorMessage && (
                  <label ><p style={{color:'#ff0000bf', fontSize:'0.7rem', border:'1px solid', padding:'1rem', borderRadius:'10px'}}>{formErrorMessage}</p></label>
                )}

                <Form.Item>
                  <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}
                    style={{color:ColorFont}}>Recordarme</Checkbox>
                  {/* <a className="login-form-forgot" href="/reset_user" style={{float:'right'}}>
                    Olvidé mi contraseña
                  </a> */}
                  <div>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{minWidth:'100%', height:'40px', marginTop:'7px', marginBottom:'7px', borderRadius:'7px'}} disabled={isSubmitting} onSubmit={handleSubmit} id="btnLogin">
                      INGRESAR
                    </Button>
                  </div>
                  <span style={{color:ColorFont}}> o... <a href="/registro">Registrarse!</a> </span>
                </Form.Item>
              </form>
            </div>
            
            <br/>
            <br/>

          </div>
        )
      }}
    </Formik>
    

    <Col sm={20} style={{textAlign:'center', margin:'auto'}}>
        <FacebookLogin
          appId="278783286733600"
          autoLoad={false}
 
          fields="name,email,picture"
          //onClick={componentClicked}
          callback={responseFacebook}
          textButton={"  Ingresar con Facebook"}
          icon="fa-facebook"
        />

        <br/> <br/>

        <GoogleLogin
          clientId="517220495690-7pv1amnufvmpont2bi6ovfqn9g2m1fbj.apps.googleusercontent.com"
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} style={{backgroundColor:'red', height:'62px', minWidth:'249px'}}>
              <GooglePlusOutlined  style={{fontSize:25, paddingTop:'0'}} />
              <span style={{fontSize:'1.1rem', fontWeight:'500'}}> &nbsp; INGRESAR CON GOOGLE </span>
            </button>
          )}
          buttonText="INGRESAR CON GOOGLE"
          autoLoad={false}
          onSuccess={() => responseGoogle()}
          //onFailure={err => console.log('fail', err)}
          cookiePolicy={'single_host_origin'}
        />
      </Col>

      <br/><br/><br/>
      <br/><br/><br/>

      <p style={{textAlign:'center', marginBottom:'0', paddingBottom:'10px', color:ColorFont}}>
        Ver <a href={'/politica-de-privacidad'}>Política de Privacidad</a>
      </p>

    </div>
  )
}


export default withRouter(LoginPage)
