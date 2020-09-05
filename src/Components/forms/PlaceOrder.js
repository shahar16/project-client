import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { Cart4 } from "react-bootstrap-icons";
import { connect } from "react-redux";
import * as Yup from 'yup';
import UserService from "../../Services/user.service"
import Constants from "../../Shared/Util/Constants";
import * as actions from "../../Store/actions";

const PlaceOrderSchema = Yup.object().shape( {
	city:             Yup.string().required( "City is required" ),
	street:           Yup.string().required( "Street is required" ),
	houseNum:         Yup.number().required( "House number is required" ),
	creditCardNumber: Yup.string().min( 16 ).max( 16 ).required( "Credit card number is required" ),
	cvv:              Yup.number().min( 100, "CVV of 3 digits" ).max( 999, "CVV of 3 digits" ).required( "CVV is required" ),
	date:             Yup.date().required( "EXP date is required" )
} )

function PlaceOrder( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );
	const [ defaultAddressPressed, setDefaultAddressPressed ] = useState( false );

	const placeOrder = async ( values ) => {
		console.log(values)
		// props.startAction();
		// try {
		// 	const { token, expiresTimeInMiliseconds, user } = await UserService.register( values );
		// 	UserService.writeToLocalStorage( token, expiresTimeInMiliseconds, user );
		// 	props.setAuthincationTimeOut( expiresTimeInMiliseconds );
		// 	props.setUser( user );
		// 	props.authSuccess( token );
		// 	props.onLog();
		// } catch ( err ) {
		// 	const error = await err.response.json();
		// 	setErrorMessage( error.message );
		// 	props.authFail( error.message );
		// }
	}

	return (
		<Formik
			initialValues={{
				city:             "",
				street:           "",
				houseNum:         "",
				creditCardNumber: "",
				cvv:              "",
				date:             "2020-09"
			}}
			validationSchema={PlaceOrderSchema}
			onSubmit={placeOrder}>
			{( { setFieldValue, values } ) => {
				return (
					<Form>
						<div className="form-group">
							<label>Address</label>
							<Field type="text" name="city" className="form-control" placeholder="City"/>
							<ErrorMessage name="city" component="div" className="form-validation-alert"/>
						</div>
						<Row>
							<Col md="8">
								<div className="form-group">
									<Field type="text" name="street" className="form-control" placeholder="Street"/>
									<ErrorMessage name="street" component="div" className="form-validation-alert"/>
								</div>
							</Col>
							<Col md="4">
								<div className="form-group">
									<Field type="number" name="houseNum" className="form-control" placeholder="Num"/>
									<ErrorMessage name="houseNum" component="div" className="form-validation-alert"/>
								</div>
							</Col>
						</Row>
						<div className="form-group">
							{props.user.defaultShippingAddress && !defaultAddressPressed && <Button
								variant="success"
								block
								onClick={() => {
									setDefaultAddressPressed( true );
									setFieldValue( "city", props.user.defaultShippingAddress.city )
									setFieldValue( "street", props.user.defaultShippingAddress.street )
									setFieldValue( "houseNum", props.user.defaultShippingAddress.houseNum )
								}}
							>
								Use Default Address
							</Button>}
							{defaultAddressPressed && <Button
								variant="success"
								block
								onClick={() => {
									setDefaultAddressPressed( false );
									setFieldValue( "city", "" )
									setFieldValue( "street", "" )
									setFieldValue( "houseNum", "" )
								}}
							>
								Change Address
							</Button>}
						</div>
						<hr/>
						<div className="form-group">
							<label>Credit Card</label>
						</div>
						<div className="form-group">
							<Field type="number" name="creditCardNumber" className="form-control"
								   placeholder="Credit Card Number"/>
							<ErrorMessage name="creditCardNumber" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="number" name="cvv" className="form-control" placeholder="cvv"/>
							<ErrorMessage name="cvv" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="month" name="date" className="form-control" placeholder="Credit Card Number"
								   min="2020-09" max="2027-12"/>
							<ErrorMessage name="date" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">
								<Cart4 style={Constants.iconStyle}/>
								Place Order
							</button>
						</div>
						{errorMessage &&
						<div className="alert alert-danger">{errorMessage}</div>
						}
					</Form>
				)
			}
			}
		</Formik>
	)
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
		user:  state.user
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		authSuccess:            ( token ) => dispatch( actions.authSuccess( token ) ),
		authFail:               ( err ) => dispatch( actions.authFail( err ) ),
		startAction:            () => dispatch( actions.startAction() ),
		setAuthincationTimeOut: ( expiresTimeInMiliseconds ) => dispatch( actions.setAuthincationTimeOut( expiresTimeInMiliseconds ) ),
		setUser:                ( user ) => dispatch( actions.setUser( user ) )
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( PlaceOrder );