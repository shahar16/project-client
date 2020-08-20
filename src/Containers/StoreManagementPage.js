import React from 'react';
import { Col, Jumbotron, Row, Table } from "react-bootstrap";
import StoreTd from "../Components/storeManagement/StoreTd";
import Constants from "../Shared/Util/Constants";

function StoreManagementPage( { stores } ) {
	return (
		<div>
			<br/>
			<Row>
				<Col md={1}></Col>
				<Col md={10}>
					{/*<Jumbotron  style={Constants.productPageStyle}>*/}
						<Table responsive>
							<thead>
							<tr>
								<th>#</th>
								<th>Store Name</th>
								<th>Amount of products</th>
								<th>Edit store info</th>
								<th>Delete store</th>
							</tr>
							</thead>
							<tbody>
								{stores.map((store, index) => <StoreTd store={store} index={index}/>)}
							</tbody>
						</Table>
					{/*</Jumbotron>*/}
				</Col>
				<Col md={1}></Col>
			</Row>
		</div>
	);
}

export default StoreManagementPage;