import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { CheckCircleFill, Pencil } from "react-bootstrap-icons";
import Constants from "../../Shared/Util/Constants";
import NewStoreForm from "../forms/NewStoreForm";

function ModalForEditStore() {
	const [ show, setShow ] = useState( false );
	const [ storeEdited, setStoreEdited ] = useState( false );

	const handleClose = () => {
		setShow( false )
	};

	const handleShow = () => {
		setShow( true );
	};

	const handleStoreAdded = () => {
		setStoreEdited( true );
		setTimeout( handleClose, 1000 );
		setTimeout( afterAdded, 1100 );
	};

	const afterAdded = () => {
		setStoreEdited( false );
	};

	return (
		<div>
			<Button variant="success" onClick={handleShow} className="modal-for-new-object">
				<Pencil style={Constants.iconStyle}/>
				Edit Store Info
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Edit Store Info
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{!storeEdited && <NewStoreForm storeAdded={handleStoreAdded}/>}
					{storeEdited &&
					<div><CheckCircleFill style={{ "marginRight": "10px" }}/>Store edited successfully</div>}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ModalForEditStore;