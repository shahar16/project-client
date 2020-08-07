import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { authLogout } from "../../Store/actions";

const ProductPageForm = ( { item } ) => {
	const [ selectedOption, setSelectedOption ] = useState( null );

	useEffect( () => {
		setSelectedOption( Object.keys( item.stock.quantities )[0] );
	}, [ item ] )

	const changeSelection = ( e ) => {
		setSelectedOption( e.target.value );
	};

	const getQuantityOptions = () => {
		const amount = item.stock.quantities[selectedOption];
		if (amount === 0) {
			return <option disabled>no items left from this {item.stock.type}</option>
		}
		return Array.apply(null, Array(amount)).map((_, index)=> <option>{index + 1}</option>);
	};

	return (
		<Form>
			<Row>
				<Col>
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Choose {item.stock.type}</Form.Label>
						<Form.Control
							as="select"
							onChange={changeSelection}
						>
							{Object.keys( item.stock.quantities ).map( ( key, index ) => <option
								disabled={item.stock.quantities[key] <= 0} selected={index === 0}>{key}</option> )}
						</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<hr/>
			<Row>
				<Col>
					<Form.Group controlId="exampleForm.ControlSelect1">
						<Form.Label>Choose quantity</Form.Label>
						<Form.Control as="select">
							{getQuantityOptions()}
						</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<hr/>
			<br/>
			<Row>
				<Col>
					<Button variant="primary" block>Add to cart</Button>
				</Col>
				<Col>
					<Button variant="success" block>Buy it now</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default ProductPageForm;