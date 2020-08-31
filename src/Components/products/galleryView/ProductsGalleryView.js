import React, { useEffect, useState } from "react";
import { useId } from "react-id-generator"
import InfiniteScroll from "react-infinite-scroll-component";
import ProductsGroup from "./ProductsGroup";

function ProductsGalleryView({ fetchService, renderStore, editMode, afterDelete }) {
	const numOfCardInRaw = 5;
	const [endOfProducts, setEndOfProducts] = useState(false);
	const [productsList, setProductsList] = useState(null);
	const [componentId] = useId();
	const [init, setInit] = useState(1);

	useEffect(() => {
		fetchMoreData(init)
	}, [])

	const fetchMoreData = async (init) => {
		console.log("fetch data");
		const list = renderStore ? await fetchService() : await fetchService(init === 1);
		list.length > 0 ? setEndOfProducts(false) : setEndOfProducts(true);
		const groupList = getGroupList(list);
		if (productsList) {
			setProductsList(productsList.concat(groupList));
		} else {
			setProductsList(groupList);
		}
	}

	const getGroupList = (list) => {
		let returnValue = [];
		let group = [];
		for (let i = 0; i < list.length; i++) {
			group.push(list[i]);
			if ((i == list.length - 1) || (i % numOfCardInRaw === numOfCardInRaw - 1)) {
				returnValue.push(group);
				group = [];
			}
		}

		console.log("init value: ..................... " + init);
		if (init && !renderStore) {
			setInit(0);
			console.log("changing init value... " + init);
		}
		//TODO: handler for more then 20 products in store
		if (renderStore) {
			setEndOfProducts(true);
		}
		return returnValue;
	}

	return (
		<div>
			{productsList &&
				<InfiniteScroll
					dataLength={productsList.length}
					next={fetchMoreData}
					hasMore={!endOfProducts}
					loader={<h4>Loading...</h4>}
					endMessage={
						<div>
							<br />
							<h4>No More Products :-(</h4>
						</div>}

				>
					{productsList.map((items, index) => <ProductsGroup items={items} key={`${componentId}:${index}`} renderStore={renderStore} editMode={editMode} afterDelete={afterDelete}/>)}
				</InfiniteScroll>
			}
		</div >
	)
}


export default ProductsGalleryView;
