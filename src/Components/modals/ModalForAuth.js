import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Login from "../forms/Login";
import SignUp from "../forms/SignUp";

function ModalForAuth( { signUp, token, history } ) {
	const [ show, setShow ] = useState( true );
	const [ needToSignUp, setNeedToSignUp ] = useState( signUp );

	const handleClose = () => {
		setNeedToSignUp( false );
		setShow( false )
		history.goBack();
	};

	const onLog = () => {
		setShow( false );
	};

	const getTitle = () => {
		return needToSignUp ? "SignUp" : "Login";
	};

	const getForm = () => {
		return needToSignUp ? <SignUp onLog={onLog}/> : <Login signUpCb={setNeedToSignUp} onLog={onLog}/>
	};

	return (
		<div>
			{!token &&
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{getTitle()}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{getForm()}
				</Modal.Body>
			</Modal>
			}
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token
	}
};

export default connect( mapStateToProps, null )( ModalForAuth );