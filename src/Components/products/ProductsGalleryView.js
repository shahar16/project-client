import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductService from "../../Services/product.test.service";
import ProductItem from "./ProductItem";

//TODO: change this component
function ProductsGalleryView() {
	const [ productsList, setProductsList ] = useState( null );

	useEffect( () => {
		fetchMoreData()
	}, [] )

	const fetchMoreData = async () => {
		console.log( "fetch data" );
		const list = await ProductService.getProducts()
		if ( productsList ) {
			setProductsList( productsList.concat( list ) );
		} else {
			setProductsList( list );
		}
	}

	return (
		<div>
			{productsList &&
			<InfiniteScroll
				dataLength={productsList.length}
				next={fetchMoreData}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				{productsList.map( ( item, index ) =>  <ProductItem key={index} item={item}/>  )}
			</InfiniteScroll>
			}
		</div>
	)
}


export default ProductsGalleryView;