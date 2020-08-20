import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

/**
 * this component id modal for confirmation. it returns a button to locate in page.
 *
 * @param info.variant       - button style(bootstrap)
 * @param info.icon          - bootstrap icon to locate on button
 * @param info.text          - text on the button
 * @param info.handleConfirm - callback function to handle confirm
 */
function ModalForConfirm( { info } ) {
	const [ show, setShow ] = useState( false );
	const [ succeed, setSucceed ] = useState( false );
	const [ error, setError ] = useState( null );

	const handleClose = () => {
		setShow( false )
	};

	const handleShow = () => {
		setShow( true );
	};

	const handleConfirm = () => {
		try {
			info.handleConfirm();
			setSucceed( true );
			setTimeout( handleClose, 1000 );
		} catch ( err ) {
			setError( err );
		}
	};

	return (
		<div>
			<Button variant={info.variant} onClick={handleShow} className="modal-for-new-object">
				{info.icon}
				{info.text}
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{!succeed && <Modal.Body>Are yoe sure?</Modal.Body>}
						{succeed && <div><CheckCircleFill style={{ "marginRight": "10px" }}/>Action succeed</div>}
						{error && <h1>Error</h1>}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleConfirm}>
						Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ModalForConfirm;