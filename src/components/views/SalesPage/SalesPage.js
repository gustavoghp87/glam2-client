import React, {useState, useEffect} from 'react'
import { USER_SERVER } from '../../../hoc/Config'
import { Card } from 'react-bootstrap'
import axios from 'axios'


function SalesPage(props) {

    const [data, setData] = useState({ pagos: [] })

    useEffect(() => {
        ;(async () => {
            const result = await axios.post(`${USER_SERVER}/getSales`, {token:document.cookie})
            setData(result.data)
        })()
    }, [])

    const fecha = (date) => {
        let hora = parseInt(date.slice(11, 13)) - 3
        if (hora<10) { hora = "0" + hora.toString() }
        let fecha = date.slice(0, 10) + " a las " + hora + date.slice(13, 16) + "hs - Argentina"
        return fecha
    }

    const importe = (quantity, price) => {
        let importe = quantity*price
        return importe
    }

    // const diaDeCobro = (timestamp) => {
    //     let suma = timestamp + 1209600000   // restarle 3 horas
    //     let diaDeCobro = new Date(suma)
    //     diaDeCobro = diaDeCobro.toISOString().slice(0, 10) + " a las " + diaDeCobro.toISOString().slice(11, 16) + "hs"
    //     return diaDeCobro
    // }


    return (

        <div style={{width: props.mobile ? '100%' : '75%', margin:'0 auto', paddingBottom:'400px'}}>
    
            <div style={{textAlign:'center', padding:'2rem auto'}}>
                <h1 style={{
                    backgroundColor:'violet', height:'70px', lineHeight:'1.6', color:props.ColorFont
                }}>
                    VENTAS
                </h1>
            </div>


            {data.pagos.map(item => (
                
                <Card key={item.mpJSON.id} style={{
                    marginTop: '25px',
                    backgroundColor: props.ColorSecundary,
                }}>

                    <Card.Body>

                        <Card.Text style={{margin:'2.5% 7% 3% 7%', fontSize:'1.1rem', color:props.ColorFont}}>

                            <span> Fecha: {fecha(item.createdAt)} {item.product[0].dateOfPurchase} <br/> </span>
                            <span> Vendidos: {

                                item.product.map((article, index) => (
                                    <span key={index}>
                                        <br/>
                                        &nbsp;&nbsp;-{article.name} | id: {article.id} | cantidad: {article.quantity} | precio: ${article.price} | <span style={{fontWeight:'600'}}> Total: ${importe(article.quantity, article.price)} </span>
                                    </span>
                                    )
                                )
                            }
                            
                            <br/>
                            
                            <span style={{fontWeight:'600'}}> Total por venta: ${item.mpJSON.transaction_amount} - Neto a recibir: ${item.mpJSON.transaction_details.net_received_amount} </span> <br/> </span>

                            <span> Usuario: {item.user.email} <br/> </span>

                            <span> Método de pago: {item.mpJSON.payment_method_id} - {item.mpJSON.payment_type_id} <br/> </span>

                            <span> Identificador de pago: {item.mpJSON.id} <br/> Estado: {item.mpJSON.status} {item.mpJSON.status_detail} <br/> </span>

                            <span> Referencia externa: {item.mpJSON.external_reference} </span>
                            
                        </Card.Text>

                    </Card.Body>

                </Card>

            ))}
            
        </div>
    )
}


export default SalesPage
