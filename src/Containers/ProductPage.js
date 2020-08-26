import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import ProductPageCarousel from "../Components/products/productPage/ProductPageCarousel";
import ProductPageInfo from "../Components/products/productPage/ProductPageInfo";
import ProductService from "../Services/product.service"
import StoreService from "../Services/store.service"

function ProductPage( props ) {
	const [ item, setItem ] = useState( null );

	useEffect( () => {
		const fetchProduct = async () => {
			try {
				const productItem = await ProductService.getProduct( props.match.params );
				const owner = await StoreService.getOwner( productItem.storeID );
				productItem.owner = owner.owner;
				productItem.stock = JSON.parse( productItem.stock );
				console.log( productItem )
				setItem( productItem );
			} catch ( err ) {
				const error = await err.response.data.message;
				console.log( error )
			}
		};
		fetchProduct();
	}, [ props.match.params ] );

	return (
		<div>
			<br/>
			<Row>
				<Col md={1}></Col>
				<Col md={6}>
					{item && <ProductPageCarousel item={item}/>}
				</Col>
				<Col>
					{item && <ProductPageInfo item={item}/>}
				</Col>
				<Col md={1}></Col>
			</Row>
		</div>
	);
}

export default ProductPage;