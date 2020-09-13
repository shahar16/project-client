import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import UserService from '../../Services/user.service'
import * as actions from '../../Store/actions'

const SignUpSchema = Yup.object().shape({
  email:    Yup.string()
              .required('Email is required').email('Invalid email'),
  password: Yup.string()
              .required('Password is required').min(6)
})

function Login (props) {
  const [errorMessage, setErrorMessage] = useState(null)

  const login = async (values) => {
    props.startAction()
    try {
      const { token, expiresTimeInMiliseconds, user } = await UserService.login(values)
      UserService.writeToLocalStorage(token, expiresTimeInMiliseconds, user)
      props.setAuthincationTimeOut(expiresTimeInMiliseconds)
      console.log(user)
      props.setUser(user)
      props.authSuccess(token)
      props.onLog()
    } catch (err) {
      // const error = await err.response.json()
      // console.log(error)
      setErrorMessage( "login failed")
      // props.authFail(error.message)
    }
  }

  const signUpClicked = () => {
    props.signUpCb(true)
  }

  return (
    <Formik
      initialValues={{
        email:    '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={login}>
      {() => {
        return (
          <Form>
            <div className="form-group row">
              <label htmlFor="login-profile-email" className="col-sm-3 col-form-label">Email</label>
              <div className="col-sm-9">
                <Field type="email" name="email" className="form-control" id="edit-profile-email"/>
                <ErrorMessage name="email" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="login-profile-password" className="col-sm-3 col-form-label">Password</label>
              <div className="col-sm-9">
                <Field type="password" name="password" className="form-control" id="edit-profile-password"/>
                <ErrorMessage name="password" component="div" className="form-validation-alert"/>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Log in</button>
            </div>
            {errorMessage &&
            <div className="alert alert-danger">{errorMessage}</div>
            }
            <button className="btn btn-outline-success btn-block" style={{ fontSize: '12px' }}
                    onClick={signUpClicked}>Did not have account?? Sign Up
            </button>
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
    setAuthincationTimeOut: (experationTime) => dispatch(actions.setAuthincationTimeOut(experationTime)),
    setUser:                (user) => dispatch(actions.setUser(user))
  }
}

export default connect(null, mapDispatchToProps)(Login)