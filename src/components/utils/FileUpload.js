import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Axios from 'axios'
import { PlusOutlined } from '@ant-design/icons'
import { IMAGES_SERVER, PRODUCT_SERVER } from '../../hoc/Config'


function FileUpload(props) {

    var [Images, setImages] = useState([])

    const onDrop = async (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data', 'content-type': 'application/json', 'content-type': 'accept', "Access-Control-Allow-Origin": "*" }
        }
        formData.append("file", files[0])
        Axios.post(`${PRODUCT_SERVER}/uploadImage`, formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])   //hardcoredeado
                    //console.log("RESP:", response.data.image)
                } else {
                    alert('Falló la carga en el servidor')
                }
            }
        )
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}   // aumentar en nginx.conf
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width:'300px', height:'240px', border:'1px solid lightgray',
                        display:'flex', alignItems:'center', justifyContent:'center'
                    }}
                        {...getRootProps()}
                    >

                        <input {...getInputProps()} />
                        <PlusOutlined style={{ fontSize: '4rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{
                display:'flex', width:'350px', height:'240px', overflowX:'auto', border: `1px solid lightgray`
            }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{width:'auto', height:'240px'}} src={`${IMAGES_SERVER}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}

            </div>

        </div>
    )
}

export default FileUpload
