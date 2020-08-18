import React from 'react';
import { Col, Row } from "react-bootstrap";
import ProductPageCarousel from "../Components/products/productPage/ProductPageCarousel";
import ProductPageInfo from "../Components/products/productPage/ProductPageInfo";

function ProductPage( { item } ) {
	return (
		<div>
			<br/>
			<Row>
				<Col md={1}></Col>
				<Col md={6}>
					<ProductPageCarousel item={item}/>
				</Col>
				<Col>
					<ProductPageInfo item={item}/>
				</Col>
				<Col md={1}></Col>
			</Row>
		</div>
	);
}

export default ProductPage;