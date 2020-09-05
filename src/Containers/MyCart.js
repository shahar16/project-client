import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import CartTd from "../Components/Cart/CartTd";
import OrderSummary from "../Components/Cart/OrderSummary";
import cartEmpty from "../resources/images/shopping-cart-empty.png"
import CartService from "../Services/cart.service"

function MyCart( props ) {
	const [ cart, setCart ] = useState( null );
	const [ forceRender, setForceRender ] = useState( false );

	useEffect( () => {
		const fetchCart = async () => {
			try {
				const res = await CartService.getCart( props.token );
				setCart( res );
			} catch ( e ) {
				setCart( null );
			}
		}

		fetchCart();
	}, [ props.token, forceRender ] )

	const afterUpdate = () => {
		setForceRender( !forceRender );
		setCart( null );
	};

	const afterPay = () => {
		props.history.push( "/" );
	};

	return (
		<div>
			<br/>
			{props.token && cart && <Row>
				<Col md={1}></Col>
				<Col md={8}>
					{cart && cart.products.length === 0 && <h4>Please add your first product</h4>}
					<Table responsive hover style={{ "marginTop": "2px" }}>
						<thead>
						<tr>
							<th></th>
							<th></th>
							<th>Product Name</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
						</thead>
						<tbody>
						{cart && cart.products.map( ( product, index ) =>
							<CartTd
								product={product}
								index={index}
								callBack={afterUpdate}
							/> )}
						</tbody>
					</Table>
				</Col>
				<Col md={3}>
					{cart && <OrderSummary cart={cart} afterPay={afterPay}/>}
				</Col>
				{/*<Col md={1}></Col>*/}
			</Row>}
			{!props.token && <h1>You need to login first</h1>}
			{props.token && !cart &&
			<Image src={cartEmpty}/>
			}
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
	}
}

export default connect( mapStateToProps, null )( MyCart );