import React from 'react'
import { Button } from 'react-bootstrap'
import { DashCircle } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import CartService from '../../Services/cart.service'

function RemoveItem ({ item, token, callBack }) {
  const removeItem = async () => {
    const data = {
      id:      item.id,
      sn:      item.sn,
      storeID: item.storeID
    }

    try {
      await CartService.removerItem(data, token)
      callBack()
    } catch (e) {

    }
  }

  return (
    <div>
      <Button variant="warning"
              onClick={removeItem}
      >
        <DashCircle/>
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, null)(RemoveItem)