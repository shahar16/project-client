import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { CheckCircleFill, Pencil } from "react-bootstrap-icons";
import Constants from "../../Shared/Util/Constants";
import NewProductForm from "../forms/NewProductForm";

function ModalForNewProduct( { storeID, productToEdit } ) {
	const [ show, setShow ] = useState( false );
	const [ productEdited, setProductEdited ] = useState( false );

	const handleClose = () => {
		setShow( false )
	};

	const handleShow = () => {
		setShow( true );
	};

	const handleProductEdited = () => {
		setProductEdited( true );
		setTimeout( handleClose, 1000 );
		setTimeout( afterAdded, 1100 );
		//TODO: handle updated - refresh view.
	};

	const afterAdded = () => {
		setProductEdited( false );
	};

	const prepareProductToEdit = ( product ) => {
		const stock = JSON.parse(product.stock);
		const quantities = [];
		for(let key in stock.quantities) {
			quantities.push({
				name: key,
				quantity: stock.quantities[key]
			});
		}

		return {
			name:        product.name,
			desc:        product.desc,
			price: product.price,
			type: stock.type,
			sn: product.sn,
			quantities: quantities,
			images:      [ {
				image: null
			} ]
		};
	};

	return (
		<div>
			<Button variant="success" onClick={handleShow} className="modal-for-new-object">
				<Pencil style={Constants.iconStyle}/>
				Edit product
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						Edit Product
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{!productEdited && <NewProductForm productAdded={handleProductEdited} storeID={storeID}
													   productToEdit={prepareProductToEdit( productToEdit )}/>}
					{productEdited &&
					<div><CheckCircleFill style={{ "marginRight": "10px" }}/>Product added successfully</div>}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ModalForNewProduct;