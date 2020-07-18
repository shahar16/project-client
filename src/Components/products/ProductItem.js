import React from 'react';
import { Button, Card } from "react-bootstrap";
import constants from "../../Shared/Util/Constants"

function ProductItem( { item } ) {
	return (
		<Card style={{ width: '15rem' }}>
			<Card.Img variant="top" src={`${constants.serverUrl}/${item.image}`} />
			<Card.Body>
				<Card.Title as={"h5"}>{item.name}</Card.Title>
				<Card.Text>
					price: {item.price} NIS
				</Card.Text>
				<Button variant="primary">Go somewhere</Button>
			</Card.Body>
		</Card>
	)
}

export default ProductItem;