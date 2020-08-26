import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";

// TODO: Add logic!!
const ProductPageForm = ( { item, token, user } ) => {
	const [ selectedOption, setSelectedOption ] = useState( null );
	const [ isOwner, setIsOwner ] = useState( false );

	useEffect( () => {
		setSelectedOption( Object.keys( item.stock.quantities )[0] );
		setIsOwner( user ? item.owner === user.email : false );
	}, [ item ] )

	const changeSelection = ( e ) => {
		setSelectedOption( e.target.value );
	};

	const getQuantityOptions = () => {
		const amount = item.stock.quantities[selectedOption];
		if ( amount === 0 ) {
			return <option disabled>no items left from this {item.stock.type}</option>
		}
		return Array.apply( null, Array( amount ) ).map( ( _, index ) => <option>{index + 1}</option> );
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
			<br/>
			<Row>
				<Col>
					{/*TODO: change to edit*/}
					{token && isOwner && <Button block>Edit</Button>}
				</Col>
			</Row>
		</Form>
	);
};

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
		user:  state.user
	}
};

export default connect( mapStateToProps, null )( ProductPageForm );