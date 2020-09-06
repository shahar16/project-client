import React from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Constants from "../../Shared/Util/Constants";

function OrderTd({ order, index }) {
    return (
        <tr>
            <td>
                {index + 1}
            </td>
            <td>
                <Image
                    className="d-block w-100"
                    src={`${Constants.serverUrl}/${order.products[0].image[0]}`}
                    alt={order.id}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
            </td>
            <td>
                <Link to={`/orders/${order.id}`}>
                    {order.id}
                </Link>
            </td>
            <td>
                {order.totalSum + " ILS"}
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

export default OrderTd;