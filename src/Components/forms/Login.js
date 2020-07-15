import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { connect } from "react-redux";
import * as Yup from 'yup';
import UserService from '../../Services/user.service'
import * as actions from "../../Store/actions";

const SignUpSchema = Yup.object().shape( {
	email:    Yup.string()
				  .required( 'Email is required' ).email( "Invalid email" ),
	password: Yup.string()
				  .required( 'Password is required' ).min( 6 )
} )

function Login( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );

	const login = async ( values ) => {
		props.startAction();
		try {
			const { token, expiresTimeInMiliseconds } = await UserService.login( values );
			UserService.writeToLocalStorage(token, expiresTimeInMiliseconds);
			props.setAuthincationTimeOut( expiresTimeInMiliseconds );
			props.setToken( token );
			props.authSuccess( token );
		} catch ( err ) {
			console.log( err );
			const error = await err.response.json();
			setErrorMessage( error.message );
			props.authFail( error.message );
		}
	}


	const signUpClicked = () => {
		props.signUpCb( true );
	}

	return (
		<Formik
			initialValues={{
				email:    "",
				password: ""
			}}
			validationSchema={SignUpSchema}
			onSubmit={login}>
			{() => {
				return (
					<Form>
						<div className="form-group">
							<Field type="email" name="email" className="form-control" placeholder="Email"/>
							<ErrorMessage name="email" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="password" name="password" className="form-control" placeholder="Password"/>
							<ErrorMessage name="password" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">Log in</button>
						</div>
						{errorMessage &&
						<div className="alert alert-danger">{errorMessage}</div>
						}
						<div className="row">
							<div className="col-6">
								<a href="https://google.com" style={{ fontSize: '12px' }}
								   className="btn btn-outline-success btn-block">Forgot your password?</a>
							</div>
							<div className="col-6">
								<button className="btn btn-outline-success btn-block" style={{ fontSize: '12px' }}
										onClick={signUpClicked}>Sign Up
								</button>
							</div>
						</div>
					</Form>
				)
			}
			}
		</Formik>
	)
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		authSuccess:            ( token ) => dispatch( actions.authSuccess( token ) ),
		authFail:               ( err ) => dispatch( actions.authFail( err ) ),
		startAction:            () => dispatch( actions.startAction() ),
		setAuthincationTimeOut: ( experationTime ) => dispatch( actions.setAuthincationTimeOut( experationTime ) )
	}
};

export default connect( null, mapDispatchToProps )( Login );