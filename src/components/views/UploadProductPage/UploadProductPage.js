import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'
import clasif from '../../utils/Clasif.json'
import { PRODUCT_SERVER} from '../../../hoc/Config'

const { Title } = Typography;
const { TextArea } = Input;

const Types = [];
for (let i in clasif) {
    Types.push({key: i, value:clasif[i]})
}


function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [TypeValue, setTypeValue] = useState(1)

    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onTypesSelectChange = (event) => {
        setTypeValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !TypeValue || !Images) {
            return alert('Hay algún campo incompleto')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            types: TypeValue,
        }

        Axios.post(`${PRODUCT_SERVER}/uploadProduct`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Producto subido con éxito')
                    props.history.push('/')
                } else {
                    alert('Falló carga de producto')
                }
            }
        )
    }


    return (

        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}> Subir Producto </Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Precio ($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />

                <br/><br/><br/>
                <select onChange={onTypesSelectChange} value={TypeValue}>
                    {Types.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br/><br/>
                <br/><br/>

                <Button
                    size="large" shape="round" type="danger"
                    style={{borderRadius:'20px'}}
                    onClick={onSubmit}
                >
                    AGREGAR
                </Button>

            </Form>

            <br/><br/><br/><br/>

        </div>
    )
}

export default UploadProductPage
