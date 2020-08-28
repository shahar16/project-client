import React from 'react';
import { Badge, Card } from "react-bootstrap";
import constants from "../../../Shared/Util/Constants"

function ProductItem({ item }) {
	return (
		<Card style={{ width: '15rem', height: '20rem' }}>
			<Card.Img variant="top" src={`${constants.serverUrl}/${item.image[0]}`} />
			<Card.Body>
				<div className={"d-flex mb-2 justify-content-between"} style={{ marginBottom: "10%" }}>
					<Card.Title as={"h4"} className={"mb-0"}>{item.name}</Card.Title>
					<Badge pill className={"mb-1"} variant={"warning"}>{item.price} ₪</Badge>
				</div>
				{/*<div className={"d-flex mb-2 justify-content-between"}>*/}
				{/*	<Button variant="primary" className={"mt-auto"} block>Go somewhere</Button>*/}
				{/*</div>*/}
			</Card.Body>
		</Card>
	)
}

export default ProductItem;