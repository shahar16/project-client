import React, { useEffect } from 'react';
import { connect } from "react-redux";
import NavBar from "../Components/NavBar";
import ProductsGalleryView from "../Components/products/ProductsGalleryView";
import * as actions from "../Store/actions";

function HomePage( props ) {

	useEffect( () => {
		props.checkAuth();
	}, [ props ] );

	return (
		<div>
			<NavBar/>
			<div className="under-nav-bar">
				<ProductsGalleryView/>
			</div>
			{/*<TestForms/>*/}
		</div>
	);
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		checkAuth: () => dispatch( actions.checkState() )
	}
};

export default connect( null, mapDispatchToProps )( HomePage );