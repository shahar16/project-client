import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import ModalForAuth from "../Components/modals/ModalForAuth";
import NavBar from "../Components/NavBar";
import * as actions from "../Store/actions";
import ProductPage from "./ProductPage";
import fakeProduct from "../Shared/Util/fakeProduct";
import fakeStores from "../Shared/Util/fakeStores";
import StorePage from './StorePage';
import ProductsGalleryView from "../Components/products/galleryView/ProductsGalleryView";
import ProductService from "../Services/product.test.service";

function HomePage(props) {

	useEffect(() => {
		props.checkAuth();
	}, [props]);

	const getHomePageProducts = async (init) => {
		return await ProductService.getHomePageProducts(init);
	}

	return (
		<BrowserRouter>
			<Route exact path="/login">
				<ModalForAuth signUp={false} />
			</Route>
			<Route exact path="/signup">
				<ModalForAuth signUp={true} />
			</Route>
			<NavBar />
			<div className="under-nav-bar">
				{/* <ProductPage item={fakeProduct} /> */}
				<ProductsGalleryView fetchService={getHomePageProducts} />
			</div>
			{/* <StorePage storeItem={fakeStores[0]} /> */}
		</BrowserRouter>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkAuth: () => dispatch(actions.checkState())
	}
};

export default connect(null, mapDispatchToProps)(HomePage);