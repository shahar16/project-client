import React from 'react';
import { Button } from "react-bootstrap";
import { Pencil, DashCircleFill } from "react-bootstrap-icons";
import Constants from "../Shared/Util/Constants";

function StoreTd( { store, index } ) {
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
				<Button variant="success">
					<Pencil style={Constants.iconStyle}/>
					Edit Store Info
				</Button>
			</td>
			<td>
				<Button variant="warning">
					<DashCircleFill style={Constants.iconStyle}/>
					Delete Store
				</Button>
			</td>
		</tr>
	);
}

export default StoreTd;