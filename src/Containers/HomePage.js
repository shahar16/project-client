import React, { useEffect } from 'react';
import { connect } from "react-redux";
import NavBar from "../Components/NavBar";
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
			<TestProduct />
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