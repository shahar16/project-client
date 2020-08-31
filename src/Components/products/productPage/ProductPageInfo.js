import React from 'react';
import { Badge, Col, Jumbotron, Row } from "react-bootstrap";
import Constants from "../../../Shared/Util/Constants";
import ProductPageForm from "../../forms/ProductPageForm";

function ProductPageInfo( { item } ) {
	return (
		<Jumbotron style={Constants.productPageStyle}>
			<Row>
				<Col>
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
			<ProductPageForm item={item}/>
		</Jumbotron>
	);
}

export default ProductPageInfo;