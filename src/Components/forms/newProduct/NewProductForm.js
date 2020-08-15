import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import ProductService from "../../../Services/product.service"
import FieldArrayErrorMassage from "./FieldArrayErrorMassage";

const NewProductSchema = Yup.object().shape( {
	name:       Yup.string().required( 'Product name is required' ),
	price:      Yup.number().required( 'Price is required' ),
	desc:       Yup.string().required( 'Description is required' ),
	type:       Yup.string().required( 'Type is required' ),
	images:     Yup.array().of( Yup.object().shape( {
		image: Yup.mixed().required('image is required')
	} ) ).min( 1 ).required( 'Please insert at least one image.' ),
	recaptcha:  Yup.array(),
	quantities: Yup.array().of( Yup.object().shape( {
		name:     Yup.string().required( 'Name is required' ),
		quantity: Yup.number().min( 1 ).required( 'Quantity is required' )
	} ) ).min( 1 )
} );

function NewProductForm( props ) {
	const [ errorMessage, setErrorMessage ] = useState( null );
	const [images, setImages] = useState([]);

	const buildStock = ( values ) => {
		let stock = { "type": values.type }
		let quantities = {}
		values.quantities.forEach( ( field ) => quantities[field.name] = field.quantity )
		stock["quantities"] = quantities;

		return JSON.stringify(stock)
	}

	const handleSubmit = async ( values ) => {
		console.log( values )
		let formData = new FormData();
		const stock = buildStock( values );
		values.images.forEach((currentImage) => formData.append('image', currentImage.image));
		formData.append( 'name', values.name );
		formData.append( 'price', values.price );
		formData.append( 'desc', values.desc );
		formData.append( 'stock', stock );
		formData.append( 'storeID', '12345678' ); // TODO: change to real storeID
		formData.append( 'owner', 'shaharyig@gmail.com' ); // TODO: change to real owner
		console.log( formData );
		try {
			const response = await ProductService.addProduct( formData );
		} catch ( err ) {
			console.log(err)
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

	const fileSelected = (event) => {
		setImages(images.concat(event.target.files[0]));
		console.log(images);
	};

	return (
		<Formik
			initialValues={{
				name:       "",
				price:      "",
				desc:       "",
				type:       "",
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
						<FieldArray name="quantities">
							{( { insert, remove, push } ) => (
								<div>
									{values.quantities.length > 0 &&
									values.quantities.map( ( _, index ) => (
										<div className="row" key={index}>
											<div className="col-5">
												<Field
													name={`quantities.${index}.name`}
													className="form-control"
													placeholder="Name"
													type="text"
												/>
												<ErrorMessage
													name={`quantities.${index}.name`}
													component="div"
													className="form-validation-alert"
												/>
											</div>
											<div className="col-5">
												<Field
													name={`quantities.${index}.quantity`}
													className="form-control"
													placeholder="Quantity"
													type="number"
												/>
												<ErrorMessage
													name={`quantities.${index}.quantity`}
													component="div"
													className="form-validation-alert"
												/>
											</div>
											<div className="col-2">
												<button
													type="button"
													className="btn btn-secondary btn-sm"
													onClick={() => remove( index )}
												>
													X
												</button>
											</div>
											<br/><br/>
										</div>
									) )}
									<button
										type="button"
										className="btn btn-outline-success btn-block"
										onClick={() => push( { name: "", quantity: "" } )}
									>
										Add Quantity
									</button>
								</div>
							)}
						</FieldArray>
						<div className="form-validation-alert">
							<FieldArrayErrorMassage name="quantities"/>
						</div>
						<br/>
						<div className="form-group">
							<label>Images</label>
						</div>
						<FieldArray name="images">
							{( { insert, remove, push } ) => (
								<div>
									{values.images.length > 0 &&
									values.images.map( ( _, index ) => (
										<div className="row" key={index}>
											<div className="col-10">
												<input type="file" name={`images.${index}.image`} className={"form-control"} onChange={(event) => {
													setFieldValue(`images.${index}.image`, event.currentTarget.files[0]);
												}}/>
												<ErrorMessage
													name={`images.${index}.image`}
													component="div"
													className="form-validation-alert"
												/>
											</div>
											<div className="col-2">
												<button
													type="button"
													className="btn btn-secondary btn-sm"
													onClick={() => remove( index )}
												>
													X
												</button>
											</div>
											<br/><br/>
										</div>
									) )}
									<button
										type="button"
										className="btn btn-outline-success btn-block"
										onClick={() => values.images.length < 10 && push( { name: "", quantity: "" } )}
									>
										Add Image
									</button>
								</div>
							)}
						</FieldArray>
						<div className="form-validation-alert">
							<FieldArrayErrorMassage name="images"/>
						</div>
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