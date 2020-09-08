import { ErrorMessage, FieldArray } from 'formik'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'
import FieldArrayErrorMassage from './FieldArrayErrorMassage'

function ImagesFieldArray ({ values, setFieldValue }) {
  return (
    <div>
      <FieldArray name="images">
        {({ remove, push }) => (
          <div>
            {values.images.length > 0 &&
            values.images.map((_, index) => (
              <div className="row" key={index}>
                <label className="col-sm-3 col-form-label">Image {index + 1}</label>
                <div className="col-sm-7">
                  <input type="file" name={`images.${index}.image`}
                         className={'form-control'} onChange={(event) => {
                    setFieldValue(`images.${index}.image`, event.currentTarget.files[0])
                  }}/>
                  <ErrorMessage
                    name={`images.${index}.image`}
                    component="div"
                    className="form-validation-alert"
                  />
                </div>
                <div className="col-sm-2">
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
                  onClick={() => values.images.length < 10 && push({ image: null })}
                >
                  <PlusCircle style={{ 'marginRight': '5px' }}/> Add Image
                </button>
              </div>
            </div>
          </div>
        )}
      </FieldArray>
      <div className="form-validation-alert">
        <FieldArrayErrorMassage name="images"/>
      </div>
    </div>
  )
}

export default ImagesFieldArray