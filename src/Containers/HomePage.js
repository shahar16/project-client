import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductsGalleryView from '../Components/products/galleryView/ProductsGalleryView'
import ProductService from '../Services/product.test.service'
import StoreService from '../Services/store.service'

function HomePage (props) {
  const [topStores, setTopStores] = useState(null)

  useEffect(() => {
    const fetchTopStores = async () => {
      try {
        const stores = await StoreService.getTopStores()
        setTopStores(stores)
      } catch (e) {

      }
    }
    fetchTopStores()
  }, [])

  const getHomePageProducts = async (init) => {
    return await ProductService.getHomePageProducts(init)
  }

  return (
    <div>
      {topStores && <Row>
        <Col md={1}></Col>
        <Col>
          <Jumbotron>
            <h3>Top Stores</h3>
            {topStores.map((store, index) => <div className='d-inline'><Link to={`/stores/${store.storeID}`} key={`${store.storeID}`} >{store.name}</Link>{index !== topStores.length - 1 ? '  |  ' : ''}</div>)}
          </Jumbotron>
        </Col>
        <Col md={1}></Col>
      </Row>}
      <ProductsGalleryView {...props} fetchService={getHomePageProducts}/>
    </div>
  )
}

export default HomePage