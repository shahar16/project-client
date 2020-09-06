import React from 'react'
import { connect } from 'react-redux'
import ProductService from '../../Services/product.service'
import Constants from '../../Shared/Util/Constants'
import ModalForConfirm from '../modals/ModalForConfirm'

function DeleteProduct ({ token, product, afterDelete }) {
  const infoToModal = {
    ...Constants.deleteStyle,
    text:          'Delete product',
    handleConfirm: async () => {
      const data = {
        storeID: product.storeID,
        sn:      product.sn
      }

      try {
        await ProductService.deleteProduct(data, token)
        setTimeout(afterDelete, 1000)
        afterDelete();
      } catch (e) {
        const newError = new Error('Cant delete product')
        throw newError
      }
    }
  }

  return (
    <ModalForConfirm info={infoToModal}/>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, null)(DeleteProduct)