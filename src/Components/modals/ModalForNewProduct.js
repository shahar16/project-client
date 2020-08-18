import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import NewProductForm from "../forms/NewProductForm";

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
				<PlusCircleFill style={{ "marginRight": "10px" }}/>
				Add new product
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						New Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<NewProductForm/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ModalForNewProduct;