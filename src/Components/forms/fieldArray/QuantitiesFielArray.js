import { ErrorMessage, Field, FieldArray } from 'formik'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'
import FieldArrayErrorMassage from './FieldArrayErrorMassage'

function QuantitiesFielArray ({ values }) {
  return (
    <div>
      <FieldArray name="quantities">
        {({ remove, push }) => (
          <div>
            {values.quantities.length > 0 &&
            values.quantities.map((_, index) => (
              <div className="form-group row" key={index}>
                <label htmlFor="quant-name" className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-3">
                  <Field
                    name={`quantities.${index}.name`}
                    className="form-control"
                    type="text"
                    id="quant-name"
                  />
                  <ErrorMessage
                    name={`quantities.${index}.name`}
                    component="div"
                    className="form-validation-alert"
                  />
                </div>
                <label htmlFor="quant-quant" className="col-sm-1 col-form-label">Qty</label>
                <div className="col-sm-3">
                  <Field
                    name={`quantities.${index}.quantity`}
                    className="form-control"
                    type="number"
                    min="0"
                    id="quant-quant"
                  />
                  <ErrorMessage
                    name={`quantities.${index}.quantity`}
                    component="div"
                    className="form-validation-alert"
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </div>
                <br/><br/>
              </div>
            ))}
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-9">
                <button
                  type="button"
                  className="btn btn-outline-success btn-block"
                  onClick={() => push({ name: '', quantity: '' })}
                >
                  <PlusCircle style={{ 'marginRight': '5px' }}/> Add Quantity
                </button>
              </div>
            </div>
          </div>
        )}
      </FieldArray>
      <div className="form-validation-alert">
        <FieldArrayErrorMassage name="quantities"/>
      </div>
    </div>
  )
}

export default QuantitiesFielArray