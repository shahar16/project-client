import { Field, getIn } from 'formik'
import React from 'react'

const FieldArrayErrorMassage = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name)
      const arrayError = typeof error === 'string' ? true : null
      const touch = getIn(form.touched, name)
      return touch && error && arrayError ? error : null
    }}
  />
)

export default FieldArrayErrorMassage

