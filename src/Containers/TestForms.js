import React, { useState } from 'react';
import { connect } from "react-redux";
import Login from '../Components/forms/Login';
import SignUp from '../Components/forms/SignUp';

function TestForms( props ) {
	const [ needToSignUp, setNeedToSignUp ] = useState( false );

	return (

		// SignUp
		<div className="App">
			<div className="container">
				{ // if token did not set, show the sign up and login
					!props.token &&
					<div className="row justify-content-center">
						{needToSignUp &&
						<div className="col-4">
							<h1 className="mt-5 mb-3">Sign Up</h1>
							<SignUp/>
						</div>
						}
						{!needToSignUp &&
						<div className="col-4">
							<h1 className="mt-5 mb-3">Log in</h1>
							<Login signUpCb={setNeedToSignUp}/>
						</div>
						}
					</div>
				}
			</div>
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token
	}
};

export default connect( mapStateToProps, null )( TestForms );
