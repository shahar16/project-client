import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from "react-bootstrap";
import StoreTd from "../Components/storeManagement/StoreTd";

//TODO: get stores from server!!
function StoreManagementPage( { stores } ) {
	const [ storesState, setStoresState ] = useState( null );

	useEffect( () => {
		setStoresState( stores );
	}, [ stores ] )

	const handleRemove = ( index ) => {
		const arrayWithoutElementAtIndex = ( arr, index ) => {
			return arr.filter( function ( value, arrIndex ) {
				return index !== arrIndex;
			} );
		}
		setStoresState( arrayWithoutElementAtIndex( storesState, index ) );
	};

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
						{storesState && storesState.map( ( store, index ) => <StoreTd store={store} index={index}
																					  handleRemove={handleRemove}/> )}
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