import React, { useEffect, useState } from 'react'
import { Jumbotron } from 'react-bootstrap'
import ProductService from '../../../Services/product.service'
import ProductsGalleryView from '../galleryView/ProductsGalleryView'

function SimilarProducts ({ productItem }) {

  const fetchSimilarProducts = async () => {
    return ProductService.getSimilarProducts()
  }

  return (
    <div>
      <Jumbotron>
        <h3>You may also interest in:</h3>
        {productItem && < ProductsGalleryView fetchService={fetchSimilarProducts} renderStore={true} />}
      </Jumbotron>
    </div>
  )
}

export default SimilarProducts