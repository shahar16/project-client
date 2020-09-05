import React, { useState } from 'react';
import { Button, Jumbotron } from "react-bootstrap";
import { BagCheck } from "react-bootstrap-icons";
import Constants from "../../Shared/Util/Constants";
import PlaceOrder from "../forms/PlaceOrder";

function OrderSummary( { cart, afterPay } ) {
	const [ showCheckout, setShowCheckout ] = useState( false );

	const getTotalPrice = () => {
		let totalPrice = 0;
		for ( let i = 0; i < cart.products.length; i++ ) {
			const currentProduct = cart.products[i]
			totalPrice += currentProduct.price * currentProduct.quantity;
		}

		return (String( totalPrice ) + ' ₪');
	};

	return (
		<div>
			<Jumbotron>
				<h4>Order Summary</h4>
				<p>Total Price: {cart && getTotalPrice()}{!cart && "0"}</p>
				<hr/>
				{!showCheckout && <Button block onClick={() => setShowCheckout( true )}>
					<BagCheck style={Constants.iconStyle}/>
					Checkout
				</Button>}
				{showCheckout &&
				<PlaceOrder cartID={cart.id} afterPay={afterPay}/>
				}
			</Jumbotron>
		</div>
	);
}

export default OrderSummary;