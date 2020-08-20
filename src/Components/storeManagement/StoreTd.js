import React from 'react';
import { DashCircleFill } from "react-bootstrap-icons";
import StoreService from "../../Services/store.service"
import Constants from "../../Shared/Util/Constants";
import ModalForConfirm from "../modals/ModalForConfirm";
import ModalForEditStore from "../modals/ModalForEditStore";

function StoreTd( { store, index } ) {

	const infoToModal = {
		variant:       "warning",
		icon:          <DashCircleFill style={Constants.iconStyle}/>,
		text:          "Delete Store",
		handleConfirm: async () => {
			const data = {
				storeID: "15",
				owner:   "Lior.Afia@gmail.com",
				name:    "Home Center"
			};

			try {
				const response = await StoreService.deleteStore( data );
			} catch ( e ) {
				throw e;
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
				<ModalForEditStore/>
			</td>
			<td>
				<ModalForConfirm info={infoToModal}/>
			</td>
		</tr>
	);
}

export default StoreTd;