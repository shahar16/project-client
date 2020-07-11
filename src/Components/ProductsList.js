import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import fetchP from "../Services/product.test.service";
import ProductItem from "./ProductItem";

//TODO: change this component
function ProductsList() {
	const [ item, setItem ] = useState( null );

	useEffect( () => {
		fetchP.getProduct( 12345678 )
			.then( ( item ) => {
				console.log( item )
				setItem( item );
			} )
	}, [] )

	return (
		<Container>
			<Row>
				<Col>
					{item && <ProductItem item={item}/>}
				</Col>
				<Col>
					{item && <ProductItem item={item}/>}
				</Col>
				<Col>
					{item && <ProductItem item={item}/>}
				</Col>

			</Row>
		</Container>
	)
}

export default ProductsList;