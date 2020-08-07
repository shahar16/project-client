import { Formik } from "formik";
import React from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import * as yup from 'yup';

const schema = yup.object( {
	name:        yup.string().required(),
	price:       yup.number().required(),
	description: yup.string().required()
} );

function NewProductForm() {
	return (
		<Formik
			validationSchema={schema}
			onSubmit={console.log}
			initialValues={{
				name: '',
				price:  '',
				desc: ''
			}}
		>
			{( {
				   handleSubmit,
				   handleChange,
				   handleBlur,
				   values,
				   touched,
				   isValid,
				   errors,
			   } ) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Row>
						<Form.Group as={Col} md="6" controlId="validationFormik01">
							<Form.Label>Product name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={values.name}
								onChange={handleChange}
								isValid={touched.name && !errors.name}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} md="6" controlId="validationFormik02">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="text"
								name="price"
								value={values.price}
								onChange={handleChange}
								isValid={touched.price && !errors.price}
							/>

							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} md="12" controlId="validationFormik03">
							<Form.Label>Description</Form.Label>
							<InputGroup>
								<Form.Control
									type="text"
									placeholder=""
									aria-describedby="inputGroupPrepend"
									name="desc"
									value={values.desc}
									onChange={handleChange}
									isInvalid={!!errors.desc}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.desc}
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
					</Form.Row>

					<Button type="submit">Submit form</Button>
				</Form>
			)}
		</Formik>
	);
}

export default NewProductForm;