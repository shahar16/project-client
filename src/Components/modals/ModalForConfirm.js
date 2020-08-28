import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import * as actions from "../../Store/actions";

/**
 * this component id modal for confirmation. it returns a button to locate in page.
 *
 * @param info.variant       - button style(bootstrap)
 * @param info.icon          - bootstrap icon to locate on button
 * @param info.text          - text on the button
 * @param info.handleConfirm - callback function to handle confirm
 *
 * in case of error, should get the right message in err.message
 */
function ModalForConfirm( props ) {
	const [ show, setShow ] = useState( false );
	const [ succeed, setSucceed ] = useState( false );
	const [ error, setError ] = useState( null );

	const handleClose = () => {
		setShow( false );
		setError( null );
		setSucceed( false );
	};

	const handleShow = () => {
		setShow( true );
	};

	const handleConfirm = async () => {
		props.startAction();
		try {
			await props.info.handleConfirm();
			setSucceed( true );
		} catch ( err ) {
			console.log( err.message )
			setError( err.message );
		} finally {
			setTimeout( handleClose, 1500 );
			props.finishAction();
		}
	};

	return (
		<div>
			<Button variant={props.info.variant} onClick={handleShow} className="modal-for-new-object">
				{props.info.icon}
				{props.info.text}
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Title>
					{!succeed && !error && <Modal.Body>Are yoe sure?</Modal.Body>}
					{succeed && <div><CheckCircleFill style={{ "marginRight": "10px" }}/>Action succeed</div>}
					{error && <Modal.Body>
						<div className="alert alert-danger">{error}</div>
					</Modal.Body>}
				</Modal.Title>
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


const mapDispatchToProps = ( dispatch ) => {
	return {
		startAction:  () => dispatch( actions.startAction() ),
		finishAction: () => dispatch( actions.finishAction() )
	}
};

export default connect( null, mapDispatchToProps )( ModalForConfirm );
