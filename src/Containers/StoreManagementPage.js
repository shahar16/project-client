import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from "react-bootstrap";
import ModalForNewStore from "../Components/modals/ModalForNewStore";
import StoreTd from "../Components/storeManagement/StoreTd";
import StoreService from "../Services/store.service"

//TODO: get stores from server!!
function StoreManagementPage() {
	const [ storesState, setStoresState ] = useState( null );

	useEffect( () => {
		fetchStores();
	}, [] )

	const fetchStores = async () => {
		try {
			const stores = await StoreService.getStoresByUser();
			setStoresState( stores );
		} catch ( err ) {
		}
	};

	const handleRemove = ( index ) => {
		const arrayWithoutElementAtIndex = ( arr, index ) => {
			return arr.filter( function ( value, arrIndex ) {
				return index !== arrIndex;
			} );
		}
		setStoresState( arrayWithoutElementAtIndex( storesState, index ) );
	};

	const userHaveStores = () => {
		if ( storesState ) {
			return storesState.length > 0;
		} else {
			return false;
		}
	};

	return (
		<div>
			<br/>
			<Row>
				<Col md={1}></Col>
				<Col md={10}>
					{/*<Jumbotron  style={Constants.productPageStyle}>*/}
					{!userHaveStores() && <h4>Please add your first store</h4>}
					<Row>
						<Col md={10}></Col>
						<Col md={2}><ModalForNewStore onSubmit={fetchStores}/> </Col>
						<Col md={1}></Col>
					</Row>
					<Table responsive style={{ "marginTop": "2px" }}>
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
						{userHaveStores() && storesState.map( ( store, index ) => <StoreTd store={store} index={index}
																						   handleRemove={handleRemove}
																						   key={store.storeID}
																						   handleUpdate={fetchStores}/> )}
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