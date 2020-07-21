import React, { useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import NavBar from "../Components/NavBar";
import ProductsGalleryView from "../Components/products/ProductsGalleryView";
import * as actions from "../Store/actions";
import TestForms from "./TestForms";
import TestProduct from "./TestProduct";

function HomePage( props ) {

	useEffect( () => {
		props.checkAuth();
	}, [] );

	return (
		<div>
			<NavBar/>
			<div className="under-nav-bar">
				<ProductsGalleryView />
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