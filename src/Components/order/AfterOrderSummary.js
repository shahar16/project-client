import React from 'react'
import { Jumbotron } from 'react-bootstrap'

function AfterOrderSummary ({ order }) {

  const getTotalPrice = () => {
    let totalPrice = 0
    for (let i = 0; i < order.products.length; i++) {
      const currentProduct = order.products[i]
      totalPrice += currentProduct.price * currentProduct.quantity
    }

    return ( String(totalPrice) + ' ₪' )
  }

  return (
    <div>
      <Jumbotron>
        <h4>Order Summary</h4>
        <h6>Order id</h6>
        <p>{order.id}</p>
        <hr/>
        <h6>Total Price</h6>
        <p>{order && getTotalPrice()}{!order && '0'}</p>
        <hr/>
        <h6>Address</h6>
        <p>{order.shippingAddress.street} {order.shippingAddress.houseNum}, {order.shippingAddress.city}</p>
        <hr/>
        <h6>Order Date</h6>
        <p>{order.orderDate.date}, {order.orderDate.hour}</p>
        <hr/>
        <h6>Estimated Shipping Date</h6>
        <p>{order.estimatedShipping.date}</p>
      </Jumbotron>
    </div>
  )
}

export default AfterOrderSummary