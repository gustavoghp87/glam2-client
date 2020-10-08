import React, { useState } from "react"
import moment from "moment"
import { Formik } from 'formik'
import * as Yup from 'yup'
import { registerUser } from "../../../_actions/user_actions"
import { useSelector, useDispatch } from "react-redux"
import { Form, Input, Button } from 'antd'


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
}

function RegisterPage(props) {

  const mode = useSelector(state => state.mode)
  const [DarkMode, setDarkMode] = useState(mode.darkMode)
  const [ColorPrimary, setColorPrimary] = useState(mode.ColorPrimary)
  const [ColorSecundary, setColorSecundary] = useState(mode.ColorSecundary)
  const [ColorFont, setColorFont] = useState(mode.ColorFont)

  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Falta el nombre...'),
        lastName: Yup.string()
          .required('Falta el apellido'),
        email: Yup.string()
          .email('Correo inválido...')
          .required('Falta el email...'),
        password: Yup.string()
          .min(6, 'Al menos 6 caracteres...')
          .required('Falta una contraseña...'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'La contraseña no coincide...')
          .required('Falta confirmar la contraseña...')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              alert("Usuario creado con éxito! Ya se puede ingresar")
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;


        if (window.location.pathname==='/register') {
          document.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
              document.getElementById('btnRegister').click()
            }
          })
        }
        
        const estilo2 = {display:'inline-block', margin:'auto', textAlign:'center'}
        var estiloApp = {width:'600px', paddingTop:'60px', margin:'auto'}
        var borde = {border:`1px solid ${ColorSecundary}`, borderRadius:'10px', paddingTop:'40px', paddingBottom:'20px'}
        try {
          if (window.screen.width<767) {
            estiloApp = {width:'300px', paddingTop:'5%', margin:'auto'}
            borde = {border:'0px'}
          }
        } catch(e) {}
        
        
        return (
          <div className="app" style={estiloApp}>
            
            <div style={estilo2}>
              <div style={borde}>

                <h1 style={{color:ColorFont}}> Registrarse </h1>
                <div style={{marginBottom:'28px'}}></div>

                <Form {...formItemLayout} onSubmit={handleSubmit}>
                  <Form.Item required label="Nombre">
                    <Input
                      id="name"
                      placeholder="Nombre/s"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback"><div style={{marginBottom:'10px'}}></div>{errors.name}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Apellido">
                    <Input
                      id="lastName"
                      placeholder="Apellido/s"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="input-feedback"><div style={{marginBottom:'10px'}}></div>{errors.lastName}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                    <Input
                      id="email"
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
                      <div className="input-feedback"><div style={{marginBottom:'10px'}}></div>{errors.email}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Contraseña" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                    <Input.Password
                      id="password"
                      placeholder="Una contraseña"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback"><div style={{marginBottom:'10px'}}></div>{errors.password}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Confirmar" hasFeedback>
                    <Input.Password
                      id="confirmPassword"
                      placeholder="Reescribir la contraseña"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback"><div style={{marginBottom:'10px'}}></div>{errors.confirmPassword}</div>
                    )}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <br />
                    <Button onClick={handleSubmit} type="primary" disabled={isSubmitting} style={{width:'100%', minHeight:'40px', borderRadius:'7px'}} id="btnRegister">
                      REGISTRARSE
                    </Button>
                  </Form.Item>
                </Form>

              </div>

              <br/> <br/>
              
              <h6 style={{color:ColorFont}}>Si creas una cuenta pero después ingresas por Facebook o Google, los métodos de ingreso se unificarán (excepto que uses distintos emails).</h6>
              <br/>
              <h6 style={{color:ColorFont}}>Si eliges una contraseña demasiado sencilla, tu navegador puede darte un mensaje de advertencia de "tu contraseña quedó expuesta"; se recomienda al menos 10 caracteres combinando letras y números.</h6>
              <br/>
            </div>
            
            <br/><br/><br/><br/>
            
          </div>
        )
      }}
    </Formik>
  )
}


export default RegisterPage
