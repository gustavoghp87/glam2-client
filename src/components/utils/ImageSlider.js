import React from 'react'
import { Carousel } from 'antd'
import { IMAGES_SERVER } from '../../hoc/Config'


function ImageSlider(props) {

    return (
        <div>
            <Carousel autoplay>
                {props.images.map( (image, index) => (
                    <div key={index}>
                        <img style={{width:'auto', maxHeight:'150px', margin:'20px auto 0 auto'}}
                            src={`${IMAGES_SERVER}/${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
