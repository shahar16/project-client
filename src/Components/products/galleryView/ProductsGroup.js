import React from 'react';
import { Col, Row } from "react-bootstrap";
import ProductItem from "./ProductItem";

function ProductsGroup({ items, renderStore }) {

	return (
		<div>
			<br />
			<Row className="justify-content-md-center">
				{items && items.map((item) => <Col md={renderStore ? 3 : 2}><ProductItem item={item} key={item.id} renderStore={renderStore}/></Col>)}
			</Row>
		</div>
	);
}

export default ProductsGroup;