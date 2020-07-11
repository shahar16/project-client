import React from 'react';
import { Card } from "react-bootstrap";
import constants from "../Shared/Util/Constants"

function ProductItem( { item } ) {
	return (
		<Card border="secondary" style={{ width: '18rem' }}>
			<Card.Header as={"h5"}>{item.name}</Card.Header>
			<Card.Img variant="top" src={`${constants.serverUrl}/${item.image}`}/>
			<Card.Body>
				<Card.Text>price: {item.price} NIS</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default ProductItem;