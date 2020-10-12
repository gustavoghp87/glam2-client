import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Col, Card, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { types, price } from './Sections/Datas'
import SearchFeature from './Sections/SearchFeature'
import { Button } from 'react-bootstrap'
import { PRODUCT_SERVER } from '../../../hoc/Config'
import { Link } from 'react-router-dom'


const { Meta } = Card

function ProductsPage(props) {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(16)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        types: [],
        price: []
    })

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit
        }
        getProducts(variables)
    }, [])

    const getProducts = (variables) => {
        Axios.post(`${PRODUCT_SERVER}/getProducts`, variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) setProducts([...Products, ...response.data.products])
                    else setProducts(response.data.products)
                    setPostSize(response.data.postSize)
                } else alert('Falló carga de productos')
            }
        )
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getProducts(variables)
        setSkip(skip)
    }


    const renderCards = Products.map( (product) => {

        const columna = (product) => {
            return (
                <Link to={`/product/${product._id}`}>
                    <Card hoverable={true} cover={ <ImageSlider images={product.images} /> } >
                        <Meta title={product.title} description={`$${product.price}`} />
                    </Card>
                </Link>
            )
        }

        // if (!product.envio) {
            return <Col key={product._id} lg={6} md={8} xs={24}>
                {columna(product)}
            </Col>
        // }

    })


    const showFilteredResults = (filters) => {
        setLimit(16)
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(variables)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filters
        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerms(newSearchTerm)
        getProducts(variables)
    }


    return (

        <div style={{width:'75%', margin:'auto', padding:'40px 0 80px 0'}}>
            <div style={{textAlign:'center'}}>
                <h2 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70px',
                    margin: 'auto',
                    color: props.ColorFont
                }}>
                    NUESTROS PRODUCTOS
                </h2>
                <br/>
                <br/>
            </div>

            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={types}
                        handleFilters={filters => handleFilters(filters, "types")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>


            {/* Search  */}
            
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1.2rem auto 2.8rem auto'}}>
                <SearchFeature refreshFunction={updateSearchTerms} />
            </div>


            {Products.length === 0 ?
                <div style={{display:'flex', height:'300px', justifyContent:'center', alignItems:'center'}}>
                    <h2>Ningún producto coincide con la búsqueda...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            
            <br /><br />

            {PostSize >= Limit &&
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="primary" sz="md" onClick={onLoadMore}> Ver más... </Button>
                </div>
            }

            <br/><br/><br/>

        </div>
    )
}


export default ProductsPage
