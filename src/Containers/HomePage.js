import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import ModalForAuth from "../Components/modals/ModalForAuth";
import ModalForNewProduct from "../Components/modals/ModalForNewProduct";
import ModalForNewStore from "../Components/modals/ModalForNewStore";
import NavBar from "../Components/NavBar";
import * as actions from "../Store/actions";

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
				<div className={"col-sm-4"}>
					<br/>
					<ModalForNewProduct/>
					<br/>
					<ModalForNewStore />

				</div>
				{/*<ProductPage item={fakeProduct}/>*/}
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