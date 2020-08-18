import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import ModalForAuth from "../Components/modals/ModalForAuth";
import NavBar from "../Components/NavBar";
import * as actions from "../Store/actions";
import ProductPage from "./ProductPage";
import fakeProduct from "../Shared/Util/fakeProduct";

function HomePage( props ) {

	useEffect( () => {
		props.checkAuth();
	}, [ props ] );

	return (
		<BrowserRouter>
			<Route exact path="/login">
				<ModalForAuth signUp={false}/>
			</Route>
			<Route exact path="/signup">
				<ModalForAuth signUp={true}/>
			</Route>
			<NavBar/>
			<div className="under-nav-bar">
				<ProductPage item={fakeProduct}/>
				{/*<ProductsGalleryView/>*/}
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