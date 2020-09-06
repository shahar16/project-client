import React from 'react';
import { Badge, Col, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Constants from "../../../Shared/Util/Constants";
import ProductPageForm from "../../forms/ProductPageForm";

function ProductPageInfo( { item, afterEdit } ) {
	return (
		<Jumbotron style={Constants.productPageStyle}>
			<Row>
				<Col md={8}>
					<h2>{item.name}</h2>
					<p>
						{item.desc}
					</p>
				</Col>
				<Col>
					<h1>
						<Badge pill className={"mb-8"} variant={"warning"}>{item.price} ₪</Badge>
					</h1>
				</Col>
			</Row>
			<hr/>
			<ProductPageForm item={item} afterEdit={afterEdit}/>
			<Link to={`/stores/${item.storeID}`}>Go to store</Link>
		</Jumbotron>
	);
}

export default ProductPageInfo;