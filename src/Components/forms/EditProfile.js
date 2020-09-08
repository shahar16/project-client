import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import UserService from '../../Services/user.service'
import * as actions from '../../Store/actions'

const SignUpSchema = Yup.object().shape({
  firstName:       Yup.string()
                     .required('First name is required'),
  lastName:        Yup.string()
                     .required('Last name is required'),
  email:           Yup.string()
                     .required('Email is required').email('Invalid email'),
  password:        Yup.string().min(6),
  confirmPassword: Yup.string()
                     .oneOf([Yup.ref('password'), null], 'Password must match'),
  city:            Yup.string(),
  street:          Yup.string(),
  houseNum:        Yup.number()
})

function SignUp (props) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const edit = async (values) => {
    console.log(values)
    props.startAction()
    try {
      const user = await UserService.updateUser(values, props.token)
      props.setUser(user)
      props.onLog()
    } catch (err) {
      const error = err.response.data
      setErrorMessage(error)
    } finally {
      props.finishAction()
    }
  }

  return (
    <Formik
      initialValues={props.user}
      validationSchema={SignUpSchema}
      onSubmit={edit}>
      {() => {
        return (
          <Form>
            <div className="form-group row">
              <label htmlFor="edit-profile-email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <Field type="email" name="email" className="form-control"
                       disabled={props.user} id="edit-profile-email"/>
                <ErrorMessage name="email" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="edit-profile-fName" className="col-sm-3 col-form-label">First Name</label>
              <div className="col-sm-9">
                <Field type="text" name="firstName" className="form-control"
                       id="edit-profile-fName"/>
                <ErrorMessage name="firstName" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="edit-profile-lName" className="col-sm-3 col-form-label">Last Name</label>
              <div className="col-sm-9">
                <Field type="text" name="lastName" className="form-control"
                       id="edit-profile-lName"/>
                <ErrorMessage name="lastName" component="div" className="form-validation-alert"/>
              </div>
            </div>
            {showPassword &&
            <div className="form-group row">
              <label htmlFor="edit-profile-password" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-9">
                <Field type="password" name="password" className="form-control"
                       id="edit-profile-password"/>
                <ErrorMessage name="password" component="div" className="form-validation-alert"/>
              </div>
            </div>}
            {showPassword &&
            <div className="form-group row">
              <label htmlFor="edit-profile-cPassword" className="col-sm-3 col-form-label">Confirm Password</label>
              <div className="col-sm-9">
                <Field type="password" name="confirmPassword" className="form-control" id="edit-profile-cPassword"/>
                <ErrorMessage name="confirmPassword" component="div" className="form-validation-alert"/>
              </div>
            </div>}
            {!showPassword &&
            <div className="form-group row">
              <div className="col-sm-3"></div>
              <div className="col-sm-9">
                <Button variant="outline-success" block onClick={() => setShowPassword(true)}>Change
                  password</Button></div></div>}
            <div className="form-group">
              <label>Default shipping address (optional)</label>
            </div>
            <div className="form-group row">
              <label htmlFor="edit-profile-city" className="col-sm-3 col-form-label">City</label>
              <div className="col-sm-9">
                <Field type="text" name="city" className="form-control" id="edit-profile-city"/>
                <ErrorMessage name="city" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="edit-profile-street" className="col-sm-3 col-form-label">Street</label>
              <div className="col-sm-5">
                <Field type="text" name="street" className="form-control"
                       id="edit-profile-street"/>
                <ErrorMessage name="street" component="div" className="form-validation-alert"/>
              </div>
              <label htmlFor="edit-profile-num" className="col-sm-1 col-form-label">Num</label>
              <div className="col-sm-3">
                <Field min="1" type="number" name="houseNum" className="form-control" id="edit-profile-num"/>
                <ErrorMessage name="houseNum" component="div" className="form-validation-alert"/>
              </div>
            </div>
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

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startAction:  () => dispatch(actions.startAction()),
    setUser:      (user) => dispatch(actions.setUser(user)),
    finishAction: () => dispatch(actions.finishAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)