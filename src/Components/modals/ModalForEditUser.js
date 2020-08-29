import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import EditProfile from "../forms/EditProfile";
import SignUp from "../forms/SignUp";

function ModalForAuth( { token, history, user } ) {
	const [ show, setShow ] = useState( true );

	const handleClose = () => {
		history.goBack();
	};

	const onUpdate = () => {
		setShow( false );
		history.goBack();
	};

	const prepareUserToEdit = ( user ) => {
		return {
			firstName:       user.firstName,
			lastName:        user.lastName,
			email:           user.email,
			password:        "",
			confirmPassword: "",
			city:            user.defaultShippingAddress.city,
			street:          user.defaultShippingAddress.street,
			houseNum:        user.defaultShippingAddress.houseNum
		}
	}

	return (
		<div>
			{token &&
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Edit profile
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditProfile user={prepareUserToEdit(user)} onLog={onUpdate}/>
				</Modal.Body>
			</Modal>
			}
			{!token && <h1>You need to login first</h1>}
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
		user:  state.user
	}
};

export default connect( mapStateToProps, null )( ModalForAuth );