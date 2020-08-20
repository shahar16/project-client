import React from 'react';
import { DashCircleFill } from "react-bootstrap-icons";
import Constants from "../../Shared/Util/Constants";
import ModalForConfirm from "../modals/ModalForConfirm";
import ModalForEditStore from "../modals/ModalForEditStore";

function StoreTd( { store, index } ) {

	const infoToModal = {
		variant:       "warning",
		icon:          <DashCircleFill style={Constants.iconStyle}/>,
		text:          "Delete Store",
		handleConfirm: () => {
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