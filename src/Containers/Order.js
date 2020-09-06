import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import OrderSummary from "../Components/Cart/OrderSummary";
import AfterOrderSummary from "../Components/order/AfterOrderSummary";
import OrderTd from "../Components/order/OrderTd";
import OrderService from "../Services/order.service"

function Order( props ) {
	const [ order, setOrder ] = useState( null );

	useEffect( () => {
		console.log( props.match.params.orderID )
		const fetchCart = async () => {
			try {
				const data = await OrderService.getOrder( props.token, props.match.params.orderID )
				console.log( data )
				setOrder( data );
			} catch ( e ) {

			}
		}

		fetchCart();
	}, [ props.match.params.orderID ] )

	return (
		<div>
			<br/>
			{props.token && order && <Row>
				<Col md={1}></Col>
				<Col md={8}>
					{order && order.products.length === 0 && <h4>Please add your first product</h4>}
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
						{order && order.products.map( ( product, index ) =>
							<OrderTd
								product={product}
								index={index}
							/> )}
						</tbody>
					</Table>
				</Col>
				<Col md={3}>
					{order && <AfterOrderSummary order={order}/>}
				</Col>
				{/*<Col md={1}></Col>*/}
			</Row>}
			{!props.token && <h1>You need to login first</h1>}
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
	}
}

export default connect( mapStateToProps, null )( Order );