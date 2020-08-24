import React from 'react';
import { DashCircleFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import StoreService from "../../Services/store.service"
import Constants from "../../Shared/Util/Constants";
import ModalForConfirm from "../modals/ModalForConfirm";
import ModalForEditProduct from "../modals/ModalForEditProduct";
import ModalForEditStore from "../modals/ModalForEditStore";

function StoreTd( { store, index, handleRemove, handleUpdate, token } ) {

	const infoToModal = {
		variant:       "warning",
		icon:          <DashCircleFill style={Constants.iconStyle}/>,
		text:          "Delete Store",
		handleConfirm: async () => {
			const data = {
				storeID: store.storeID,
				owner:   store.owner,
				name:    store.name
			};

			try {
				await StoreService.deleteStore( data, token );
				handleRemove( index );
			} catch ( e ) {
				const errors = e.response.data.message.split( ":" )
				const error = errors[errors.length - 1]
				const newError = new Error( error );
				throw newError;
			}
		}
	};


	return (
		<tr>
			<td>
				{index + 1}
			</td>
			<td>
				<a href={`/stores/${store.storeID}`}>
					{store.name}
				</a>
			</td>
			<td>
				{store.products.length}
			</td>
			<td>
				<ModalForEditStore storeToEdit={store} handleUpdate={handleUpdate}/>
			</td>
			<td>
				{/*<ModalForConfirm info={infoToModal}/>*/}
				<ModalForEditProduct storeID={store.storeID} productToEdit={store.products[3]}/>
			</td>
		</tr>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token
	}
};

export default connect( mapStateToProps, null )( StoreTd );