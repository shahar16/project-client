import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import NewProductForm from "../forms/NewProductForm";
import {CheckCircleFill} from "react-bootstrap-icons";

function ModalForNewProduct() {
	const [ show, setShow ] = useState( false );
	const [productAdded, setProductAdded] = useState(false);

	const handleClose = () => {
		setShow( false )
	};

	const handleShow = () => {
		setShow( true );
	};

	const handleUpload = () => {
		setProductAdded(true);
		setTimeout(handleClose, 1000);
	};

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
					{!productAdded && <NewProductForm productAdded={handleUpload}/>}
					{productAdded && <div><CheckCircleFill style={{ "marginRight": "10px" }}/>Product added successfully</div>}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ModalForNewProduct;