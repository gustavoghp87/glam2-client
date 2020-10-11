import React from 'react'
import { SketchOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons'



function Footer(props) {


    const renderFooter = () => {
        if (window.screen.width>767) {
            
            let estiloIcons = {fontSize:38}

            return (
                <div className="main-footer" style={{fontSize:'1.5rem', paddingTop:'20px', paddingBottom:'20px', backgroundColor:props.ColorSecundary, height:'250px'}}>
                    <p style={{color:'violet', textAlign:'center', marginTop:'20px'}}>Senillosa 226 - CABALLITO</p>
                    <p style={{color:'violet', textAlign:'center'}}>(11) 4901-3467 &nbsp; | &nbsp; 11-6957-5866</p>
                    <div style={{display:'flex', margin:'auto', textAlign:'center', alignItems:'center', justifyContent:'center'}}>
                        <br/>
                        
                        <span style={{display:'inline-block'}}>
                            <a href="https://glamstudio.com.ar" style={{color:'violet', fontWeight:'600'}}> <SketchOutlined style={{fontSize:35}} />
                            <span style={{fontSize:'1.8rem'}}> &nbsp; GlamStudio.com.ar </span> </a>
                        </span>
                        <span style={{display:'inline-block'}}>
                            <a href={'https://www.instagram.com/glamstudiomakeuphair/'} target={'_blank'} rel="noopener noreferrer" style={{color:'violet', marginLeft:'40px'}}> <InstagramOutlined style={estiloIcons}/> </a>
                            <a href={'https://www.facebook.com/glamstudio.com.ar'} target={'_blank'} rel="noopener noreferrer" style={{color:'violet', marginLeft:'20px'}}> <FacebookOutlined style={estiloIcons}/> </a>
                            <a href={'https://api.whatsapp.com/send?phone=5491169575866&amp;source=&amp;data='} target={'_blank'} rel="noopener noreferrer" style={{color:'violet', marginLeft:'20px', marginRight:'10px'}}> <WhatsAppOutlined style={estiloIcons}/> </a>
                        </span>
                    </div>
                </div>
            )
        } else {

            let estiloIcons = {fontSize:35};

            return (
                <div className="main-footer" style={{fontSize:'1rem', paddingTop:'20px', paddingBottom:'20px', backgroundColor:props.ColorSecundary, height:'280px'}}>
                    <div style={{display:'block', margin:'auto', textAlign:'center'}}>
                        <p style={{color:'violet', textAlign:'center', marginTop:'20px'}}>Senillosa 226 - CABALLITO</p>
                        <p style={{color:'violet', textAlign:'center'}}>(11) 4901-3467 &nbsp; | &nbsp; 11-6957-5866</p>
                        <span style={{display:'inline-block', marginTop:'12px', marginBottom:'12px'}}>
                            <a href={'https://www.instagram.com/glamstudiomakeuphair/'} target={'_blank'} rel="noopener noreferrer" style={{color:'violet'}}> <InstagramOutlined style={estiloIcons}/> </a>
                            <a href={'https://www.facebook.com/glamstudio.com.ar'} target={'_blank'} rel="noopener noreferrer" style={{color:'violet', marginLeft:'30px'}}> <FacebookOutlined style={estiloIcons}/> </a>
                            <a href={'https://api.whatsapp.com/send?phone=5491169575866&amp;source=&amp;data='} target={'_blank'} rel="noopener noreferrer" style={{color:'violet', marginLeft:'30px'}}> <WhatsAppOutlined style={estiloIcons}/> </a>
                        </span>
                        <br/>
                        <div style={{display:'display', alignItems:'center', height:'70px', marginTop: window.screen.width>990 ? '10px' : '15px'}}>
                            <a href="https://glamstudio.com.ar" style={{color:'violet', fontWeight:'600'}}>
                                <SketchOutlined style={{fontSize: window.screen.width>990 ? 40 : 27}} />
                                <span style={{fontSize: window.screen.width>990 ? '1.5rem' : '1.3rem'}}> &nbsp; GlamStudio.com.ar </span>
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
    }

    
    return (
        <>
            <p style={{
                textAlign: 'center',
                backgroundColor: props.ColorPrimary,
                marginBottom: '0',
                paddingBottom: '10px',
                color: props.ColorFont
            }}
                >Ver <a href={'/condiciones-de-uso'}>Condiciones de Uso</a>
            </p>
            
            {renderFooter()}
        </>
    )
}


export default Footer
