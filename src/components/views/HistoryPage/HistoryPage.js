import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'


function HistoryPage(props) {

    const fecha = (timestamp) => {
        var a = new Date(timestamp)
        var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
        var year = a.getFullYear()
        var month = months[a.getMonth()]
        var date = a.getDate()
        var hour = a.getHours()
        var min = a.getMinutes()
        if (hour<10) {hour = "0" + hour}
        if (min<10) {min = "0" + min}
        var time = date + ' ' + month + ' ' + year + ' a las ' + hour + ':' + min
        return time
    }

    let estRender1 = {display:'block'}
    let estRender2 = {display:'none'}
    try {
        if (window.screen.width<=767) {
            estRender1 = {display:'none'}
            estRender2 = {display:'block'}
        }
    } catch(e) {}


    const render1 = () => (
        <table>
            <thead>
                <tr>
                    <th>Fecha de Pago</th>
                    <th>Producto</th>
                    <th>Título</th>
                    <th>Precio</th>
                    <th>Cant</th>
                    <th>Total</th>
                    <th>ID Pago</th>
                    <th>ID Producto</th>
                </tr>
            </thead>

            <tbody>
                {props.user.userData && props.user.userData.history &&
                    props.user.userData.history.reverse().map((item) => (
                        <tr key={item.id}>
                            <td>{fecha(item.dateOfPurchase)}</td>
                            <td><img style={{width:'70px'}} alt="product" src={`${item.images}`} /></td>
                            <td>{item.name}</td>
                            <td style={{textAlign:'center'}}>${item.price}</td>
                            <td style={{textAlign:'center'}}>{item.quantity}</td>
                            <td style={{textAlign:'center'}}>${item.price*item.quantity}</td>
                            <td>{item.paymentId}</td>
                            <td>{item.id}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )

    const render2 = () => (
        <div>
            {props.user.userData && props.user.userData.history &&
                props.user.userData.history.map( item => (
                    <>
                    <Card key={item.id} style={{width:'70%', display:'block', margin:'auto'}}>
                        <Card.Img variant="top" src={`${item.images}`} />
                        <Card.Body>
                            <Card.Title style={{maxWidth:'300px', textAlign:'center'}}>Producto: {item.name} dfskmd sldkfj slkfns dlkfsdf nsd lkfkmsdfs 554 s56 dsfmns dfkl m</Card.Title>
                        </Card.Body>

                        <ListGroup className="list-group-flush" style={{fontWeight:'500'}}>
                            <ListGroupItem>Fecha de Pago: {fecha(item.dateOfPurchase)}hs</ListGroupItem>
                            <ListGroupItem>Precio: ${item.price}</ListGroupItem>
                            <ListGroupItem>Cantidad: {item.quantity}</ListGroupItem>
                            <ListGroupItem>ID Pago: {item.paymentId}</ListGroupItem>
                            <ListGroupItem>ID Producto: {item.id}</ListGroupItem>
                        </ListGroup>
                    </Card>
                    <br/>
                    <br/>
                    <br/>
                    </>
                ))
            }
        </div>
    )

    let estiloAncho = {width:'100%', display:'block', margin:'3rem auto' }
    try {
        if (window.screen.width<=767) {
            estiloAncho = {width:'100%', display:'block', margin:'3rem auto' }
        }
    } catch(e) {}


    return (
        <div style={estiloAncho}>
            <div style={{textAlign:'center'}}>
                <h1>Historial de Compras</h1>
            </div>
            <br />

            <div style={estRender1}> {render1()} </div>
            <div style={estRender2}> {render2()} </div>

            <br/><br/><br/><br/><br/><br/>
        </div>
    )
}


export default HistoryPage
