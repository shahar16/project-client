import React, { useState } from 'react';
import Login from '../Components/forms/Login';
import SignUp from '../Components/forms/SignUp'

function TestForms() {
	const [token, setToken] = useState(null);
	const [needToSignUp, setNeedToSignUp] = useState(false);

	return (

		// SignUp
		<div className="App">
			<div className="container">
				{ // if token did not set, show the sign up and login
				  !token &&
				  <div className="row justify-content-center">
				    {needToSignUp &&
				      <div className="col-4" >
				        <h1 className="mt-5 mb-3">Sign Up</h1>
				        <SignUp setToken={setToken} />
				      </div>
				    }
				    {!needToSignUp &&
				      <div className="col-4" >
				        <h1 className="mt-5 mb-3">Log in</h1>
				        <Login setToken={setToken} signUpCb={setNeedToSignUp} />
				      </div>
				    }
				  </div>
				}
			</div>
		</div>
	);
}

export default TestForms;
