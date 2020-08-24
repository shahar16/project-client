import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { connect } from "react-redux";
import * as Yup from "yup";
import ProductService from "../../Services/product.service"
import * as actions from "../../Store/actions";
import ImagesFieldArray from "./fieldArray/ImagesFieldArray";
import QuantitiesFielArray from "./fieldArray/QuantitiesFielArray";

const NewProductSchema = Yup.object().shape( {
	name:       Yup.string().required( 'Product name is required' ),
	price:      Yup.number().required( 'Price is required' ),
	desc:       Yup.string().required( 'Description is required' ),
	type:       Yup.string().required( 'Type is required' ),
	images:     Yup.array().of( Yup.object().shape( {
		image: Yup.mixed().required( 'image is required' )
	} ) ).min( 1 ).required( 'Please insert at least one image.' ),
	quantities: Yup.array().of( Yup.object().shape( {
		name:     Yup.string().required( 'Name is required' ),
		quantity: Yup.number().min( 1 ).required( 'Quantity is required' )
	} ) ).min( 1 )
} );

function NewProductForm( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );

	const buildStock = ( values ) => {
		let stock = { "type": values.type }
		let quantities = {}
		values.quantities.forEach( ( field ) => quantities[field.name] = field.quantity )
		stock["quantities"] = quantities;

		return JSON.stringify( stock )
	}


	const handleSubmit = async ( values ) => {

		let formData = new FormData();
		const stock = buildStock( values );
		values.images.forEach( ( currentImage ) => formData.append( 'image', currentImage.image ) );
		formData.append( 'name', values.name );
		formData.append( 'price', values.price );
		formData.append( 'desc', values.desc );
		formData.append( 'stock', stock );
		formData.append( 'sn', values.sn );
		formData.append( 'storeID', props.storeID );
		formData.append( 'owner', props.user.email );

		props.startAction();
		try {
			await ProductService.addProduct( formData, props.token );
			props.productAdded();
		} catch ( err ) {
			const error = err.response.data.message.split().toString().split( ':' )[3];
			setErrorMessage( error );
		} finally {
			props.finishAction();
		}
	};

	return (
		<Formik
			initialValues={{
				name:       "",
				price:      "",
				desc:       "",
				type:       "",
				sn:         "",
				quantities: [ {
					name:     "",
					quantity: ""
				} ],
				images:     [ {
					image: null
				} ]
			}}
			validationSchema={NewProductSchema}
			onSubmit={handleSubmit}>
			{( { values, setFieldValue } ) => {
				return (
					<Form>
						<div className="form-group">
							<label>General Information</label>
							<Field type="text" name="sn" className="form-control" placeholder="Serial Number"/>
							<ErrorMessage name="sn" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="name" className="form-control" placeholder="Product Name"/>
							<ErrorMessage name="name" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="price" className="form-control" placeholder="Price"/>
							<ErrorMessage name="price" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="desc" className="form-control" placeholder="Description"/>
							<ErrorMessage name="desc" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<label>Quantities</label>
							<Field type="text" name="type" className="form-control" placeholder="Option Type"/>
							<ErrorMessage name="type" component="div" className="form-validation-alert"/>
						</div>
						<QuantitiesFielArray values={values}/>
						<br/>
						<div className="form-group">
							<label>Images</label>
						</div>
						<ImagesFieldArray values={values} setFieldValue={setFieldValue}/>
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

const mapStateToProps = ( state ) => {
	return {
		token: state.token,
		user: state.user
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		startAction:  () => dispatch( actions.startAction() ),
		finishAction: () => dispatch( actions.finishAction() )
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( NewProductForm );