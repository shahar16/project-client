import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import ProductPageCarousel from '../Components/products/productPage/ProductPageCarousel'
import ProductPageInfo from '../Components/products/productPage/ProductPageInfo'
import SimilarProducts from '../Components/products/productPage/SimilarProducts'
import ProductService from '../Services/product.service'
import StoreService from '../Services/store.service'

function ProductPage (props) {
  const [item, setItem] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productItem = await ProductService.getProduct(props.match.params)
        const owner = await StoreService.getOwner(productItem.storeID)
        productItem.owner = owner.owner
        console.log(productItem.stock)
        let tempStock
        try {
          tempStock = JSON.parse(productItem.stock)
        } catch (err) {
          tempStock = productItem.stock
        }
        productItem.stock = tempStock
        console.log(productItem)
        setItem(productItem)
      } catch (err) {
        const error = await err.response.data.message
        console.log(error)
      }
    }
    fetchProduct()
  }, [props.match.params])

  const afterEdit = () => {
    setItem(null)
  }

  return (
    <div>
      {item && <Helmet>
        <title>{item.name}</title>
      </Helmet>}
      <br/>
      <Row>
        <Col md={1}></Col>
        <Col md={6}>
          {item && <ProductPageCarousel item={item}/>}
        </Col>
        <Col>
          {item && <ProductPageInfo item={item} afterEdit={afterEdit}/>}
        </Col>
        <Col md={1}></Col>
      </Row>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          {item && <SimilarProducts productItem={item}/>}
        </Col>
        <Col md={1}></Col>
      </Row>
    </div>
  )
}

export default ProductPage