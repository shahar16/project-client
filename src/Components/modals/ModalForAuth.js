import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Login from "../forms/Login";
import SignUp from "../forms/SignUp";

function ModalForAuth( { signUp, token, history, text } ) {
	const [ show, setShow ] = useState( false );
	const [ needToSignUp, setNeedToSignUp ] = useState( signUp );

	const handleClose = () => {
		setNeedToSignUp( false );
		setShow( false )
		history.goBack();
	};

	const onLog = () => {
		setShow( false );
		history.goBack();
	};

	const getTitle = () => {
		return needToSignUp ? "SignUp" : "Login";
	};

	const getForm = () => {
		return needToSignUp ? <SignUp onLog={onLog}/> : <Login signUpCb={setNeedToSignUp} onLog={onLog}/>
	};

	return (
		<div>
			<Link onClick={()=> setShow(true)}>{text}</Link>
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
			{token && handleClose()}
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token
	}
};

export default connect( mapStateToProps, null )( ModalForAuth );