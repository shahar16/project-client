import React from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Constants from "../../Shared/Util/Constants";
import Quantity from "./Quantity";

function CartTd( { product, index, callBack } ) {
	return (
		<tr>
			<td>
				{index + 1}
			</td>
			<td>
				<Link to={`/products/${product.storeID}/${product.sn}`}>
					<Image
						className="d-block w-100"
						src={`${Constants.serverUrl}/${product.image[0]}`}
						alt={product.name}
						style={{maxWidth: "100px", maxHeight: "100px"}}
					/>
				</Link>
			</td>
			<td>
				<Link to={`/products/${product.storeID}/${product.sn}`}>
					{product.name}
				</Link>
			</td>
			<td>
				<Quantity quantity={product.quantity} product={product} callBack={callBack}/>
			</td>
			<td>
				{`${product.quantity} X ${product.price} = ${product.quantity * product.price}`}
			</td>
		</tr>
	);
}

export default CartTd;