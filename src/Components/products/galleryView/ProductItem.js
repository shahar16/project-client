import React from 'react';
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import constants from "../../../Shared/Util/Constants"

function ProductItem({ item, renderStore }) {
	return (
		<Link to={`/products/${item.storeID}/${item.sn}`} >
			<Card style={{ width: '15rem', height: '20rem' }}>
				<div style={{height: '16rem'}}>
					<Card.Img variant="top" src={`${constants.serverUrl}/${item.image[0]}`} />
				</div>
				<Card.Body>
					<div className={"d-flex mb-0 justify-content-between"} >
						<Card.Title as={"h4"} className={"mb-0"}>{item.name}</Card.Title>
						<Badge pill className={"mb-1"} variant={"warning"}>{item.price} ₪</Badge>
					</div>
					{/*TODO: add delete button*/}
					{/*<div className={"d-flex mb-2 justify-content-between"}>*/}
					{/*	<Button variant="primary" className={"mt-auto"} block>Go somewhere</Button>*/}
					{/*</div>*/}
				</Card.Body>
			</Card>
		</Link>
	)
}

export default ProductItem;
