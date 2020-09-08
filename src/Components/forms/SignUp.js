import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
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
  password:        Yup.string()
                     .required('Password is required').min(6),
  confirmPassword: Yup.string()
                     .oneOf([Yup.ref('password'), null], 'Password must match')
                     .required('Confirm password is required'),
  city:            Yup.string(),
  street:          Yup.string(),
  houseNum:        Yup.number()
})

function SignUp (props) {
  const [errorMessage, setErrorMessage] = useState(null)

  const register = async (values) => {
    props.startAction()
    try {
      const { token, expiresTimeInMiliseconds, user } = await UserService.register(values)
      UserService.writeToLocalStorage(token, expiresTimeInMiliseconds, user)
      props.setAuthincationTimeOut(expiresTimeInMiliseconds)
      props.setUser(user)
      props.authSuccess(token)
      props.onLog()
    } catch (err) {
      const error = await err.response.json()
      setErrorMessage(error.message)
      props.authFail(error.message)
    }
  }

  return (
    <Formik
      initialValues={{
        firstName:       '',
        lastName:        '',
        email:           '',
        password:        '',
        confirmPassword: '',
        city:            '',
        street:          '',
        houseNum:        ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={register}>
      {() => {
        return (
          <Form>
            <div className="form-group row">
              <label htmlFor="signUp-firstName" className="col-sm-3 col-form-label">First Name</label>
              <div className="col-sm-9">
                <Field type="text" name="firstName" className="form-control"
                       id="signUp-firstName"/>
                <ErrorMessage name="firstName" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="signUp-lastName" className="col-sm-3 col-form-label">Last Name</label>
              <div className="col-sm-9">
                <Field type="text" name="lastName" className="form-control"
                       id="signUp-lastName"/>
                <ErrorMessage name="lastName" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="signUp-email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <Field type="email" name="email" className="form-control" id="signUp-email"/>
                <ErrorMessage name="email" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="signUp-password" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-9">
                <Field type="password" name="password" className="form-control"
                       id="signUp-password"/>
                <ErrorMessage name="password" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="signUp-confirmPassword" className="col-sm-3 col-form-label">Confirm Password</label>
              <div className="col-sm-9">
                <Field type="password" name="confirmPassword" className="form-control"
                       id="signUp-confirmPassword"/>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="form-validation-alert"/>
            </div>
            <div className="form-group">
              <label>Default shipping address (optional)</label>
            </div>
            <div className="form-group row">
              <label htmlFor="signUp-city" className="col-sm-3 col-form-label">City</label>
              <div className="col-sm-9">
                <Field type="text" name="city" className="form-control" id="signUp-city"/>
                <ErrorMessage name="city" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <Row>
              <Col md="8">
                <div className="form-group row">
                  <label htmlFor="signUp-street" className="col-sm-4 col-form-label">Street</label>
                  <div className="col-sm-8">
                    <Field type="text" name="street" className="form-control"
                           id="signUp-street"/>
                    <ErrorMessage name="street" component="div" className="form-validation-alert"/>
                  </div>
                </div>
              </Col>
              <Col md="4">
                <div className="form-group row">
                  <label htmlFor="signUp-num" className="col-sm-3 col-form-label">Num</label>
                  <div className="col-sm-9">
                    <Field min="1" type="number" name="houseNum" className="form-control" id="signUp-num"/>
                    <ErrorMessage name="houseNum" component="div" className="form-validation-alert"/>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess:            (token) => dispatch(actions.authSuccess(token)),
    authFail:               (err) => dispatch(actions.authFail(err)),
    startAction:            () => dispatch(actions.startAction()),
    setAuthincationTimeOut: (expiresTimeInMiliseconds) => dispatch(actions.setAuthincationTimeOut(expiresTimeInMiliseconds)),
    setUser:                (user) => dispatch(actions.setUser(user))
  }
}

export default connect(null, mapDispatchToProps)(SignUp)