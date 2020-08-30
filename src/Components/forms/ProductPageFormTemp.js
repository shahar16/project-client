import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";

// TODO: Add logic!!
const ProductPageForm = ( { item, token, user } ) => {
	const [ isOwner, setIsOwner ] = useState( false );

	useEffect( () => {
		setIsOwner( user ? item.owner === user.email : false );
	}, [ item ] )

	const handleSubmit = ( values ) => {
		console.log( values )
	};

	return (
		<Formik
			initialValues={{
				categoryType: `Choose ${item.stock.type}`,
				quant:        "Choose quantity"
			}}
			onSubmit={handleSubmit}>
			{( { values, handleChange } ) => {
				return (
					<Form>
						<Row>
							<Col>
								<div className="form-group">
									<label>Choose {item.stock.type}</label>
									<Field as="select"
										   name="categoryType"
										   className="form-control"
										   onChange={handleChange}
									>
										<option value={`Choose ${item.stock.type}`} defaultValue>Choose {item.stock.type}</option>
										{Object.keys( item.stock.quantities ).map( ( key, index ) => <option
											disabled={item.stock.quantities[key] <= 0}
											value={key}
											selected={index === 0}>{key}</option> )}
									</Field>
								</div>
							</Col>
						</Row>
						<hr/>
						<Row>
							<Col>
								<div className="form-group">
									<label>Choose quantity</label>
									<Field as="select" name="quant" className="form-control">
										<option value='Choose quantity' defaultValue>Choose quantity</option>
										{
											item.stock.quantities[values.categoryType] > 0 && Array.apply( null, Array( item.stock.quantities[values.categoryType] ) ).map( ( _, index ) => <option>{index + 1}</option> )
										}
										{
											item.stock.quantities[values.categoryType] <= 0 && <option disabled>no items left from this {item.stock.type}</option>
										}
									</Field>
								</div>
							</Col>
						</Row>
						<hr/>
						<br/>
						<Row>
							<Col>
								<Button variant="primary"
										type="submit"
										block
										disabled={values.categoryType === `Choose ${item.stock.type}` || values.quant === 'Choose quantity'}
								>Add to cart</Button>
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
				)
			}
			}
		</Formik>
	);
};

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
		user:  state.user
	}
};

export default connect( mapStateToProps, null )( ProductPageForm );