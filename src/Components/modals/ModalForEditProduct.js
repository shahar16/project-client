import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { CheckCircleFill, Pencil } from 'react-bootstrap-icons'
import Constants from '../../Shared/Util/Constants'
import NewProductForm from '../forms/NewProductForm'

function ModalForNewProduct ({ storeID, productToEdit, afterEdit }) {
  const [show, setShow] = useState(false)
  const [productEdited, setProductEdited] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }

  const handleProductEdited = () => {
    setProductEdited(true)
    setTimeout(handleClose, 1000)
    setTimeout(afterAdded, 1100)
    setTimeout(afterEdit, 1100)
  }

  const afterAdded = () => {
    setProductEdited(false)
  }

  const prepareProductToEdit = (product) => {
    let stock
    try {
      stock = JSON.parse(product.stock)
    } catch (err) {
      stock = product.stock
    }
    const quantities = []
    for (let key in stock.quantities) {
      quantities.push({
        name:     key,
        quantity: stock.quantities[key]
      })
    }

    return {
      name:       product.name,
      desc:       product.desc,
      price:      product.price,
      type:       stock.type,
      sn:         product.sn,
      quantities: quantities,
      images:     [{
        image: null
      }],
      label:      product.label
    }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow} block>
        <Pencil style={Constants.iconStyle}/>
        Edit product
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!productEdited && <NewProductForm productAdded={handleProductEdited} storeID={storeID}
                                             productToEdit={prepareProductToEdit(productToEdit)}/>}
          {productEdited &&
          <div><CheckCircleFill style={{ 'marginRight': '10px' }}/>Product added successfully</div>}
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalForNewProduct