import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { FileEarmarkMinus } from "react-bootstrap-icons";
import { connect } from "react-redux";
import * as Yup from "yup";
import StoreService from "../../Services/store.service"
import Constants from "../../Shared/Util/Constants";
import * as actions from "../../Store/actions";
import ImagesFieldArray from "./fieldArray/ImagesFieldArray";

const NewStoreSchema = Yup.object().shape( {
	name:        Yup.string().required( 'Product name is required' ),
	desc:        Yup.string().required( 'Description is required' ),
	images:      Yup.array().of( Yup.object().shape( {
		image: Yup.mixed().required( 'image is required' )
	} ) ).min( 1 ).required( 'You must enter at least one image' ),
	email:       Yup.string().required( 'Contact email is required ' ).email( "Invalid email" ),
	phoneNumber: Yup.string().required( "Phone number is required" ),
	city:        Yup.string(),
	street:      Yup.string(),
	houseNum:    Yup.number(),
} );

const EditStoreSchema = Yup.object().shape( {
	name:        Yup.string().required( 'Product name is required' ),
	desc:        Yup.string().required( 'Description is required' ),
	images:      Yup.array().of( Yup.object().shape( {
		image: Yup.mixed()
	} ) ),
	email:       Yup.string().required( 'Contact email is required ' ).email( "Invalid email" ),
	phoneNumber: Yup.string().required( "Phone number is required" ),
	city:        Yup.string(),
	street:      Yup.string(),
	houseNum:    Yup.number(),
} );

function NewStoreForm( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );
	const [ showImagesArray, setShowImagesArray ] = useState( true );

	useEffect( () => {
		if ( props && props.storeToEdit ) {
			setShowImagesArray( false );
		}
	}, [] )

	const buildContact = ( values ) => {
		let contact = {};
		contact.email = values.email;
		contact.phoneNumber = values.phoneNumber;
		contact.adress = {}
		contact.adress.city = values.city;
		contact.adress.street = values.street;
		contact.adress.houseNum = values.houseNum;

		return JSON.stringify( contact );
	};

	//TODO: add real logic and connect to redux
	const handleSubmit = async ( values ) => {
		let formData = new FormData();
		const contact = buildContact( values );
		if ( showImagesArray ) {
			values.images.forEach( ( currentImage ) => formData.append( 'image', currentImage.image ) );
		}
		formData.append( 'name', values.name );
		formData.append( 'desc', values.desc );
		formData.append( 'contact', contact );
		formData.append( 'owner', 'Koby.Kala@gmail.com' ); // TODO: change to real owner
		if ( props.storeToEdit ) {
			formData.append( 'storeID', props.storeToEdit.storeID );
		}

		props.startAction();
		try {
			if ( props.storeToEdit ) {
				await StoreService.editStore( formData );
			} else {
				await StoreService.addStore( formData );
			}
			props.storeAdded();
		} catch ( err ) {
			if ( props.storeToEdit ) {
				const error = await err.response.data.message;
				setErrorMessage( error );
			} else {
				const errors = await err.response.data.message.split( ":" );
				const error = errors[errors.length - 1];
				setErrorMessage( error );
			}
		} finally {
			props.finishAction();
		}
	};

	return (
		<Formik
			initialValues={props.storeToEdit || {
				name:        "",
				desc:        "",
				images:      [ {
					image: null
				} ],
				email:       "",
				phoneNumber: "",
				city:        "",
				street:      "",
				houseNum:    "",
			}}
			validationSchema={showImagesArray ? NewStoreSchema : EditStoreSchema}
			onSubmit={handleSubmit}>
			{( { values, setFieldValue } ) => {
				return (
					<Form>
						<div className="form-group">
							<label>General Information</label>
							<Field type="text" name="name" className="form-control" placeholder="Store Name"
								   disabled={props.storeToEdit}/>
							<ErrorMessage name="name" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="desc" className="form-control" placeholder="Description"/>
							<ErrorMessage name="desc" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<label>Contact</label>
						</div>
						<div className="form-group">
							<Field type="email" name="email" className="form-control" placeholder="Email"/>
							<ErrorMessage name="email" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="phoneNumber" className="form-control" placeholder="Phone Number"/>
							<ErrorMessage name="phoneNumber" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="city" className="form-control" placeholder="City"/>
							<ErrorMessage name="city" component="div" className="form-validation-alert"/>
						</div>
						<Row>
							<Col md="8">
								<div className="form-group">
									<Field type="text" name="street" className="form-control" placeholder="Street"/>
									<ErrorMessage name="street" component="div" className="form-validation-alert"/>
								</div>
							</Col>
							<Col md="4">
								<div className="form-group">
									<Field type="number" name="houseNum" className="form-control" placeholder="Number"/>
									<ErrorMessage name="houseNum" component="div" className="form-validation-alert"/>
								</div>
							</Col>
						</Row>
						<div className="form-group">
							<label>Images</label>
						</div>
						{showImagesArray && <ImagesFieldArray values={values} setFieldValue={setFieldValue}/>}
						{!showImagesArray && <div>
							<Button variant="warning" block onClick={() => setShowImagesArray( true )}>
								<FileEarmarkMinus style={Constants.iconStyle}/>
								Remove Images
							</Button>
						</div>}
						<br/>
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">Submit</button>
						</div>
						{errorMessage &&
						<div className="alert alert-danger">{errorMessage}</div>
						}
					</Form>
				)
			}
			}
		</Formik>
	)
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		startAction:  () => dispatch( actions.startAction() ),
		finishAction: () => dispatch( actions.finishAction() )
	}
};

export default connect( null, mapDispatchToProps )( NewStoreForm );