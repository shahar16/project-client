import React from 'react';
import { Col, Row } from "react-bootstrap";
import ProductItem from "./ProductItem";

function ProductsGroup( { items } ) {

	return (
		<div>
			<br/>
			<Row className="justify-content-md-center">
				{items && items.map( ( item ) => <Col md={2}><ProductItem item={item} key={item.id}/></Col> )}
			</Row>
		</div>
	);
}

export default ProductsGroup;