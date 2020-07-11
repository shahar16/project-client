import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { connect } from "react-redux";
import * as Yup from 'yup';
import UserService from '../../Services/user.service'
import * as actions from "../../Store/actions";

const SignUpSchema = Yup.object().shape( {
	firstName:       Yup.string()
						 .required( 'First name is required' ),
	lastName:        Yup.string()
						 .required( 'Last name is required' ),
	email:           Yup.string()
						 .required( 'Email is required' ).email( "Invalid email" ),
	password:        Yup.string()
						 .required( 'Password is required' ).min( 6 ),
	confirmPassword: Yup.string()
						 .oneOf( [ Yup.ref( "password" ), null ], "Password must match" )
						 .required( "Confirm password is required" )
} )

function SignUp( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );

	const register = async ( values ) => {
		try {
			const token = await UserService.register( values );
			props.setToken( token );
			props.authSuccess( token );
		} catch ( err ) {
			const error = await err.response.json();
			setErrorMessage( error.message );
			props.authFail( error.message );
		}
	}

	return (
		<Formik
			initialValues={{
				firstName:       "",
				lastName:        "",
				email:           "",
				password:        "",
				confirmPassword: ""
			}}
			validationSchema={SignUpSchema}
			onSubmit={register}>
			{() => {
				return (
					<Form>
						<div className="form-group">
							<Field type="text" name="firstName" className="form-control" placeholder="First name"/>
							<ErrorMessage name="firstName" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="lastName" className="form-control" placeholder="Last name"/>
							<ErrorMessage name="lastName" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="email" name="email" className="form-control" placeholder="Email"/>
							<ErrorMessage name="email" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="password" name="password" className="form-control" placeholder="Password"/>
							<ErrorMessage name="password" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="password" name="confirmPassword" className="form-control"
								   placeholder="Confirm Password"/>
							<ErrorMessage name="confirmPassword" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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

const mapDispatchToProps = ( dispatch ) => {
	return {
		authSuccess: ( token ) => dispatch( actions.authSuccess( token ) ),
		authFail:    ( err ) => dispatch( actions.authFail( err ) )
	}
};

export default connect( null, mapDispatchToProps )( SignUp );