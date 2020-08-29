import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import * as Yup from 'yup';
import UserService from "../../Services/user.service"
import * as actions from "../../Store/actions";

const SignUpSchema = Yup.object().shape( {
	firstName:       Yup.string()
						 .required( 'First name is required' ),
	lastName:        Yup.string()
						 .required( 'Last name is required' ),
	email:           Yup.string()
						 .required( 'Email is required' ).email( "Invalid email" ),
	password:        Yup.string().min( 6 ),
	confirmPassword: Yup.string()
						 .oneOf( [ Yup.ref( "password" ), null ], "Password must match" ),
	city:            Yup.string(),
	street:          Yup.string(),
	houseNum:        Yup.number()
} )

function SignUp( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );
	const [ showPassword, setShowPassword ] = useState( false );

	const edit = async ( values ) => {
		console.log( values )
		props.startAction();
		try {
			const user = await UserService.updateUser( values, props.token )
			props.setUser( user );
			props.onLog();
		} catch ( err ) {
			const error = err.response.data;
			setErrorMessage( error );
		} finally {
			props.finishAction();
		}
	}

	return (
		<Formik
			initialValues={props.user}
			validationSchema={SignUpSchema}
			onSubmit={edit}>
			{() => {
				return (
					<Form>
						<div className="form-group">
							<Field type="email" name="email" className="form-control" placeholder="Email"
								   disabled={props.user}/>
							<ErrorMessage name="email" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="firstName" className="form-control" placeholder="First name"/>
							<ErrorMessage name="firstName" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="lastName" className="form-control" placeholder="Last name"/>
							<ErrorMessage name="lastName" component="div" className="form-validation-alert"/>
						</div>
						{showPassword && <div className="form-group">
							<Field type="password" name="password" className="form-control" placeholder="Password"/>
							<ErrorMessage name="password" component="div" className="form-validation-alert"/>
						</div>}
						{showPassword && <div className="form-group">
							<Field type="password" name="confirmPassword" className="form-control"
								   placeholder="Confirm Password"/>
							<ErrorMessage name="confirmPassword" component="div" className="form-validation-alert"/>
						</div>}
						{!showPassword &&
						<Button variant="outline-success" block onClick={() => setShowPassword( true )}>Change
							password</Button>}
						<div className="form-group">
							<label>Default shipping address (optional)</label>
						</div>
						<div className="form-group">
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
									<Field type="number" name="houseNum" className="form-control" placeholder="Number"/>
									<ErrorMessage name="houseNum" component="div" className="form-validation-alert"/>
								</div>
							</Col>
						</Row>
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">Submit</button>
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
		token: state.token
	}
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		startAction:  () => dispatch( actions.startAction() ),
		setUser:      ( user ) => dispatch( actions.setUser( user ) ),
		finishAction: () => dispatch( actions.finishAction() )
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( SignUp );