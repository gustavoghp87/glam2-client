import React, { useState } from 'react'
import { Collapse, Radio, Row } from 'antd'

const { Panel } = Collapse


function RadioBox(props) {

    const [Value, setValue] = useState('0')

    const renderRadioBox = () => (
        props.list && props.list.map( (value) => (
            <Row style={{marginBottom:'12px'}} key={value._id}>
                <Radio value={`${value._id}`}>{value.name}</Radio>
            </Row>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Por Precio" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>

                        {renderRadioBox()}

                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
