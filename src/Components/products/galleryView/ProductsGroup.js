import React from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductItem from './ProductItem'

function ProductsGroup ({ items, renderStore, editMode, afterDelete }) {

  return (
    <div>
      <br/>
      <Row className="justify-content-md-center">
        {items && items.map((item) => <Col key={`${item.storeID}/${item.sn}`} md={2}><ProductItem item={item} renderStore={renderStore}
                                                               editMode={editMode} afterDelete={afterDelete}/></Col>)}
      </Row>
    </div>
  )
}

export default ProductsGroup