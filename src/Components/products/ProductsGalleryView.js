import React, { useEffect, useState } from "react";
import { useId } from "react-id-generator"
import InfiniteScroll from "react-infinite-scroll-component";
import ProductService from "../../Services/product.test.service";
import ProductsGroup from "./ProductsGroup";

function ProductsGalleryView() {
	const numOfCardInRaw = 5;
	const [ productsList, setProductsList ] = useState( null );
	const [ componentId ] = useId();

	useEffect( () => {
		fetchMoreData()
	}, [] )

	const fetchMoreData = async () => {
		console.log( "fetch data" );
		const list = await ProductService.getProducts()
		const groupList = getGroupList( list );
		if ( productsList ) {
			setProductsList( productsList.concat( groupList ) );
		} else {
			setProductsList( groupList );
		}
	}

	const getGroupList = ( list ) => {
		let returnValue = [];
		let group = [];
		for ( let i = 0; i < list.length; i++ ) {
			group.push( list[i] );
			if ( i % numOfCardInRaw === numOfCardInRaw - 1 ) {
				returnValue.push( group );
				group = [];
			}
		}

		console.log( returnValue );
		return returnValue;
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
				{productsList.map( ( items, index ) => <ProductsGroup items={items} key={`${componentId}:${index}`}/> )}
			</InfiniteScroll>
			}
		</div>
	)
}


export default ProductsGalleryView;