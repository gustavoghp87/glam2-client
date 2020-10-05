import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import axios from 'axios'
import FileUpload from '../../utils/FileUpload'
import { PRODUCT_SERVER } from '../../../hoc/Config'

const { Title } = Typography
const { TextArea } = Input

const Types = []
for (let i in clasif) {
    Types.push({key: i, value:clasif[i]})
}


export class UploadProductPage extends Component {

    state = {
        title: '',
        description: '',
        types: 7,
        images: [],
        price: 0
    }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
        this.setState({ price: parseInt(event.currentTarget.value, 10) })
    }

    handleChangeDescription = (event) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeTypes = (event) => {
        this.setState({ types: event.currentTarget.value })
    }

    onSubmit = (event) => {
        event.preventDefault()

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Hay que iniciar sesión primero...')
        }

        if (!this.state.title || !this.state.description ||
            !this.state.types || !this.state.images
            || !this.state.price) {
            return alert('Hay algún campo sin completar...')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            types: this.state.types,
            price: this.state.price,
            token: document.cookie
        }

        axios.post(`${PRODUCT_SERVER}/uploadProduct`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Subido con éxito')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('Falló la carga')
                }
            }
        )
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
    }


    render() {
        return (
            <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2} > Subir Producto </Title>
            </div>

            <Form onSubmit={this.onSubmit}>
               
               <FileUpload refreshFunction={this.updateFiles} />    

                <br /><br />
                <label>Título</label>
                <Input
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <br /><br />
                <label>Descripción</label>
                <TextArea
                    onChange={this.handleChangeDescription}
                    value={this.state.description}
                />
                <br /><br />
                <label>Precio ($)</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <select onChange={this.handleChangeTypes}>
                    {Types.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Agregar
                </Button>
            </Form>
        </div>
        )
    }
}

export default UploadProductPage
