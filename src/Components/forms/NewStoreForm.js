import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import StoreService from "../../Services/store.service"
import ImagesFieldArray from "./fieldArray/ImagesFieldArray";

const NewProductSchema = Yup.object().shape( {
	name:   Yup.string().required( 'Product name is required' ),
	desc:   Yup.string().required( 'Description is required' ),
	images: Yup.array().of( Yup.object().shape( {
		image: Yup.mixed().required( 'image is required' )
	} ) ).min( 1 ).required( 'You must enter at least one image' )
} );

function NewProductForm( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );

	const handleSubmit = async ( values ) => {
		console.log( values )
		let formData = new FormData();
		values.images.forEach( ( currentImage ) => formData.append( 'image', currentImage.image ) );
		formData.append( 'name', values.name );
		formData.append( 'desc', values.desc );
		formData.append( 'owner', 'shaharyig@gmail.com' ); // TODO: change to real owner
		console.log( formData );
		try {
			const response = await StoreService.addStore( formData );
		} catch ( err ) {
			console.log( err )
		}

		// props.startAction();
		// try {
		// 	const { token, expiresTimeInMiliseconds, user } = await UserService.login( values );
		// 	UserService.writeToLocalStorage( token, expiresTimeInMiliseconds, user );
		// 	props.setAuthincationTimeOut( expiresTimeInMiliseconds );
		// 	console.log(user);
		// 	props.setUser( user );
		// 	props.authSuccess( token );
		// 	props.onLog();
		// } catch ( err ) {
		// 	console.log( err );
		// 	const error = await err.response.json();
		// 	setErrorMessage( error.message );
		// 	props.authFail( error.message );
		// }
	};

	return (
		<Formik
			initialValues={{
				name:   "",
				desc:   "",
				images: [ {
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
							<Field type="text" name="name" className="form-control" placeholder="Product Name"/>
							<ErrorMessage name="name" component="div" className="form-validation-alert"/>
						</div>
						<div className="form-group">
							<Field type="text" name="desc" className="form-control" placeholder="Description"/>
							<ErrorMessage name="desc" component="div" className="form-validation-alert"/>
						</div>
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

export default NewProductForm;