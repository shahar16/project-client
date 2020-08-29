import React from 'react';
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import constants from "../../../Shared/Util/Constants"
import DeleteProduct from "../deleteProduct";

function ProductItem({ item, renderStore }) {
	const styleWithoutDelete = { width: '15rem', height: '20rem' };
	const styleWithDelete = { width: '15rem', height: '24rem' };

	return (
		<Card style={renderStore ? styleWithDelete : styleWithoutDelete}>
			<Link to={`/products/${item.storeID}/${item.sn}`} >
				<div style={{height: '16rem'}}>
					<Card.Img variant="top" src={`${constants.serverUrl}/${item.image[0]}`} />
				</div>
				<Card.Body>
					<div className={"d-flex mb-0 justify-content-between"} >
						<Card.Title as={"h4"} className={"mb-0"}>{item.name}</Card.Title>
						<Badge pill className={"mb-1"} variant={"warning"}>{item.price} ₪</Badge>
					</div>
				</Card.Body>
			</Link>
			{renderStore && <Card.Footer>
				{/*TODO: add delete button*/}
				<div className={"d-flex mb-0 mt-0 justify-content-between"}>
					<DeleteProduct product={item}/>
				</div>
			</Card.Footer>}
		</Card>
	)
}

export default ProductItem;
