import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Constants from '../../Shared/Util/Constants'

function OrderTd ({ order, index }) {

  const getMostExpProduct = () => {
    let index = 0
    for (let i = 0; i < order.products.length; i++) {
      if (order.products[index].price < order.products[i].price) {
        index = i
      }
    }

    return order.products[index]
  }

  return (
    <tr>
      <td>
        {index + 1}
      </td>
      <td>
        <Image
          className="d-block w-100"
          src={`${Constants.serverUrl}/${getMostExpProduct().image[0]}`}
          alt={order.id}
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      </td>
      <td>
        <Link to={`/orders/${order.id}`}>
          {order.id}
        </Link>
      </td>
      <td>
        {order.totalSum + ' ILS'}
      </td>
      <td>
        {order.orderDate.date}
      </td>
      <td>
        {order.estimatedShipping.date}
      </td>
    </tr>
  )
}

export default OrderTd