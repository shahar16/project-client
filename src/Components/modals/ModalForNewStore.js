import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import NewStoreForm from "../forms/NewStoreForm";
import {PlusCircleFill} from "react-bootstrap-icons";

function ModalForNewProduct() {
	const [ show, setShow ] = useState( false );

	const handleClose = () => {
		setShow( false )
	};

	const handleShow = () => {
		setShow( true );
	}

	return (
		<div>
			<Button variant="success" onClick={handleShow} className="modal-for-new-object">
				<PlusCircleFill style={{"marginRight" : "10px"}}/>
				Add new store
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						New Store
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<NewStoreForm/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ModalForNewProduct;