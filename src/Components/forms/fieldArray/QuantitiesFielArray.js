import { ErrorMessage, Field, FieldArray, Form } from "formik";
import React from 'react';
import FieldArrayErrorMassage from "./FieldArrayErrorMassage";

function QuantitiesFielArray( { values } ) {
	return (
		<div>
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
		</div>
	);
}

export default QuantitiesFielArray;