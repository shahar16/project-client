import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import ModalForAuth from "../Components/modals/ModalForAuth";
import ModalForNewProduct from "../Components/modals/ModalForNewProduct";
import NavBar from "../Components/NavBar";
import * as actions from "../Store/actions";
import ProductPage from "./ProductPage";
import StoreManagementPage from "./StoreManagementPage";

function HomePage( props ) {

	useEffect( () => {
		props.checkAuth();
	}, [ props ] );

	return (
		<BrowserRouter>
			<NavBar/>
			<div className="under-nav-bar">
				<Route exact
					   path="/login"
					   render={( props ) => (
						   <ModalForAuth {...props} signUp={false}/>
					   )}
				/>
				<Route exact
					   path="/signup"
					   render={( props ) => (
						   <ModalForAuth {...props} signUp={true}/>
					   )}
				/>
				<Route exact
					   path="/products/:storeID/:sn"
					   component={ProductPage}
				/>
				{/*<ProductPage item={fakeProduct}/>*/}
				{/*<ProductsGalleryView/>*/}
				{/*<ModalForNewStore />*/}
				{/*<ModalForNewProduct storeID={"e3725de0-bd33-4d2a-a05e-dd6c7cbd5601"}/>*/}
				{/*<StoreManagementPage/>*/}
				<br/>
				<br/><br/><br/><br/><br/><br/><br/>
				<br/><br/><br/><br/><br/><br/><br/>
				<br/><br/><br/><br/><br/><br/><br/>
				<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
				<h1>dfsd</h1>
			</div>
		</BrowserRouter>
	);
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		checkAuth: () => dispatch( actions.checkState() )
	}
};

export default connect( null, mapDispatchToProps )( HomePage );