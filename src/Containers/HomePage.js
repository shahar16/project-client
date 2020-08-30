import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ModalForAuth from "../Components/modals/ModalForAuth";
import NavBar from "../Components/NavBar";
import ProductsGalleryView from "../Components/products/galleryView/ProductsGalleryView";
import SearchTow from "../Components/SearchBox";
import ProductService from "../Services/product.test.service";
import * as actions from "../Store/actions";
import ProductPage from "./ProductPage";
import StoreManagementPage from "./StoreManagementPage";
import StorePage from './StorePage';

function HomePage( props ) {

	useEffect( () => {
		props.checkAuth();
	}, [ props ] );

	const getHomePageProducts = async ( init ) => {
		return await ProductService.getHomePageProducts( init );
	}

	return (
		<BrowserRouter>
			<NavBar/>
			<div className="under-nav-bar">
				<Switch>
					{/*http://localhost:3000/login*/}
					<Route exact
						   path="/"
						   render={( props ) => (
							   <ProductsGalleryView {...props} fetchService={getHomePageProducts}/>
						   )}
					/>
					<Route exact
						   path="/login"
						   render={( props ) => (
							   <ModalForAuth {...props} signUp={false}/>
						   )}
					/>
					{/*http://localhost:3000/signUp*/}
					<Route exact
						   path="/signup"
						   render={( props ) => (
							   <ModalForAuth {...props} signUp={true}/>
						   )}
					/>
					{/*http://localhost:3000/products/e3725de0-bd33-4d2a-a05e-dd6c7cbd5601/123456*/}
					<Route exact
						   path="/products/:storeID/:sn"
						   component={ProductPage}
					/>
					{/*http://localhost:3000/my-stores*/}
					<Route exact
						   path="/my-stores"
						   component={StoreManagementPage}
					/>
					{/*TODO: Should be the lat path!!!*/}
					{/* <Route path="*" component={Error} /> */}
					http://localhost:3000/stores/e3725de0-bd33-4d2a-a05e-dd6c7cbd5601
					<Route exact
						   path="/stores/:storeID"
						   component={StorePage}
					/>
				</Switch>

				{/*<ProductsGalleryView/>*/}
				{/*<ModalForNewProduct storeID={"e3725de0-bd33-4d2a-a05e-dd6c7cbd5601"}/>*/}

			</div>
			{/* <StorePage storeItem={fakeStores[0]} /> */}
		</BrowserRouter>
	);
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		checkAuth: () => dispatch( actions.checkState() )
	}
};

export default connect( null, mapDispatchToProps )( HomePage );