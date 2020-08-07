import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import ModalForAuth from "../Components/modals/ModalForAuth";
import NavBar from "../Components/NavBar";
import * as actions from "../Store/actions";
import ProductPage from "./ProductPage";

function HomePage( props ) {
	//TODO: Remove! only for test the productPage
	const item = {
		name:  "computer",
		price: "300",
		desc:  "Dnaiel, do not warry, we will finish this project some day",
		image: [
			"uploads/images/pic4.jpg",
			"uploads/images/pic5.jpg",
			"uploads/images/pic3.jpg"
		]
	}

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
				<ProductPage item={item}/>
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