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
                <div className="col-10">
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
                <div className="col-2">
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
            <button
              type="button"
              className="btn btn-outline-success btn-block"
              onClick={() => values.images.length < 10 && push({ image: null })}
            >
              <PlusCircle style={{ 'marginRight': '5px' }}/> Add Image
            </button>
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