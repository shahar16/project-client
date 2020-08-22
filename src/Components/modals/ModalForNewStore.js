import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { CheckCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import NewStoreForm from "../forms/NewStoreForm";

function ModalForNewStore( props ) {
	const [ show, setShow ] = useState( false );
	const [ storeAdded, setStoreAdded ] = useState( false );

	const handleClose = () => {
		setShow( false )
	};

	const handleShow = () => {
		setShow( true );
	};

	const handleStoreAdded = () => {
		setStoreAdded( true );
		setTimeout( handleClose, 1000 );
		setTimeout( afterAdded, 1100 );
		props.onSubmit()
	};

	const afterAdded = () => {
		setStoreAdded( false );
	};

	return (
		<div>
			<Button variant="primary" onClick={handleShow} className="modal-for-new-object">
				<PlusCircleFill style={{ "marginRight": "10px" }}/>
				Add new store
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						New Store
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{!storeAdded && <NewStoreForm storeAdded={handleStoreAdded}/>}
					{storeAdded &&
					<div><CheckCircleFill style={{ "marginRight": "10px" }}/>Store added successfully</div>}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ModalForNewStore;