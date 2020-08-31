import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { DashCircleFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import Error from "../Components/Error";
import ModalForNewProduct from '../Components/modals/ModalForNewProduct';
import ProductsGalleryView from "../Components/products/galleryView/ProductsGalleryView";
import StoreService from "../Services/store.service";
import Constants from "../Shared/Util/Constants";


function StorePage( props ) {
	const [ show, setShow ] = useState( false );
	const [ item, setItem ] = useState( null );
	const [ editMode, setEditMode ] = useState( false );

	useEffect( () => {
		console.log( "rendering StorePage" )
		setShow( true );
		getStore();
	}, [ props.match.params ] );

	const getStoreProducts = async () => {
		return await StoreService.getStoreProducts( props.match.params );
	}

	const getStore = async () => {
		await setItem(null);
		console.log( "getStore" );
		const storeItem = await StoreService.getStore( props.match.params );
		console.log( storeItem )
		setItem( storeItem );
	}

	function enableEditingStore() {
		const storeOwnerID = item.owner;
		return storeOwnerID === props.user.email;
	}

	function printStoreContact() {
		return (
			<div>
				<h5>Contact</h5>
				<p>Email: {item.contact.email}</p>
				<p>Phone: {item.contact.phoneNumber}</p>
				<p>Address: {item.contact.adress.houseNum} {item.contact.adress.street}, {item.contact.adress.city}</p>
			</div>
		)
	}

	function renderNewProductModal() {
		return (
			<Row>
				<Col md={4}></Col>
				<Col md={2}><ModalForNewProduct storeID={item.storeID} callback={getStore}/></Col>
				<Col md={2}>
					<Button variant="warning" style={{ width: "190px" }} onClick={() => setEditMode( !editMode )}>
						<DashCircleFill style={Constants.iconStyle}/>
						{editMode && "Finish Remove"}
						{!editMode && "Remove Products"}
					</Button>
				</Col>
				<Col md={4}></Col>
			</Row>
		)
	}

	return (
		// <div className="under-nav-bar">
		<div id="storePage">
			{item && <div className="jumbotron text-center" id="jshadow">
				<h1>Welcome to {item.name}</h1>
				<br/>
				<Row>
					<Col md={2}></Col>
					<Col md={4}>
						<br/>
						<h5>Store Description</h5>
						{item.desc}
					</Col>
					<Col md={1}>
						<div className="vr"></div>
					</Col>
					<Col md={4} style={{ textAlign: "left" }}>
						<br/>
						{item && printStoreContact()}
					</Col>
					<Col md={1}></Col>
				</Row>
			</div>}
			{item && props.token && enableEditingStore() && renderNewProductModal()}
			<br/>
			{ item && < ProductsGalleryView fetchService={getStoreProducts} renderStore={true} editMode={editMode} afterDelete={getStore}/>  }
		</div>
	);
}

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
		user:  state.user
	}
}

export default connect( mapStateToProps, null )( StorePage );
