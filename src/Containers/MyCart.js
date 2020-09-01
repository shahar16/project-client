import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from "react-bootstrap";
import { BagCheck } from "react-bootstrap-icons";
import { connect } from "react-redux";
import CartTd from "../Components/Cart/CartTd";
import CartService from "../Services/cart.service"
import Constants from "../Shared/Util/Constants";

function MyCart( props ) {
	const [ cart, setCart ] = useState( null );
	const [ forceRender, setForceRender ] = useState( false );
	const [ showCheckout, setShowCheckout ] = useState( false );

	useEffect( () => {
		const fetchCart = async () => {
			try {
				const res = await CartService.getCart( props.token );
				setCart( res );
			} catch ( e ) {
				console.log( "errrrr" )
			}
		}

		fetchCart();
	}, [ props.token, forceRender ] )

	const afterUpdate = () => {
		setForceRender( !forceRender );
		setCart( null );
	};

	return (
		<div>
			<br/>
			{props.token && <Row>
				<Col md={1}></Col>
				<Col md={10}>
					{cart && cart.products.length === 0 && <h4>Please add your first store</h4>}
					<Row>
						<Col md={10}></Col>
						<Col md={2}>
							<Button onSubmit={() => setShowCheckout( true )}>
								<BagCheck style={Constants.iconStyle}/>
								Checkout
							</Button>
						</Col>
						<Col md={1}></Col>
					</Row>
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
				<Col md={1}></Col>
			</Row>}
			{!props.token && <h1>You need to login first</h1>}
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token
	}
}

export default connect( mapStateToProps, null )( MyCart );