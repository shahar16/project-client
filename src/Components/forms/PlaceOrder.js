import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Cart4, CheckCircleFill } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import CartService from '../../Services/cart.service'
import Constants from '../../Shared/Util/Constants'
import * as actions from '../../Store/actions'

const PlaceOrderSchema = Yup.object().shape({
  city:             Yup.string().required('City is required'),
  street:           Yup.string().required('Street is required'),
  houseNum:         Yup.number().required('House number is required'),
  creditCardNumber: Yup.string().min(16).max(16).required('Credit card number is required'),
  cvv:              Yup.number().min(100, 'CVV of 3 digits').max(999, 'CVV of 3 digits').required('CVV is required'),
  date:             Yup.date().required('EXP date is required')
})

function PlaceOrder (props) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAddressPressed, setDefaultAddressPressed] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    setErrorMessage(null)
  }

  const placeOrder = async (values) => {
    const data = {
      shippingAddress: {
        city:     values.city,
        street:   values.street,
        houseNum: values.houseNum
      },
      paymentMethod:   {
        creditCardNumber: values.creditCardNumber,
        cvv:              values.cvv,
        date:             values.date
      },
      id:              props.cartID
    }

    props.startAction()
    try {
      await CartService.placeOrder(data, props.token)
      setShowModal(true)
      props.setCart(null)
      setTimeout(props.afterPay, 1500)
    } catch (err) {
      setErrorMessage('Payment failed!')
    } finally {
      props.finishAction()
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          city:             '',
          street:           '',
          houseNum:         '',
          creditCardNumber: '',
          cvv:              '',
          date:             '2020-09'
        }}
        validationSchema={PlaceOrderSchema}
        onSubmit={placeOrder}>
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <div className="form-group">
                <label>Address</label>
                <Field type="text" name="city" className="form-control" placeholder="City"/>
                <ErrorMessage name="city" component="div" className="form-validation-alert"/>
              </div>
              <Row>
                <Col md="8">
                  <div className="form-group">
                    <Field type="text" name="street" className="form-control" placeholder="Street"/>
                    <ErrorMessage name="street" component="div" className="form-validation-alert"/>
                  </div>
                </Col>
                <Col md="4">
                  <div className="form-group">
                    <Field min="1" type="number" name="houseNum" className="form-control"
                           placeholder="Num"/>
                    <ErrorMessage name="houseNum" component="div"
                                  className="form-validation-alert"/>
                  </div>
                </Col>
              </Row>
              <div className="form-group">
                {props.user.defaultShippingAddress && !defaultAddressPressed && <Button
                  variant="success"
                  block
                  onClick={() => {
                    setDefaultAddressPressed(true)
                    setFieldValue('city', props.user.defaultShippingAddress.city)
                    setFieldValue('street', props.user.defaultShippingAddress.street)
                    setFieldValue('houseNum', props.user.defaultShippingAddress.houseNum)
                  }}
                >
                  Use Default Address
                </Button>}
                {defaultAddressPressed && <Button
                  variant="success"
                  block
                  onClick={() => {
                    setDefaultAddressPressed(false)
                    setFieldValue('city', '')
                    setFieldValue('street', '')
                    setFieldValue('houseNum', '')
                  }}
                >
                  Change Address
                </Button>}
              </div>
              <hr/>
              <div className="form-group">
                <label>Credit Card</label>
              </div>
              <div className="form-group">
                <Field min="1" type="number" name="creditCardNumber" className="form-control"
                       placeholder="Credit Card Number"/>
                <ErrorMessage name="creditCardNumber" component="div"
                              className="form-validation-alert"/>
              </div>
              <div className="form-group">
                <Field min="1" type="number" name="cvv" className="form-control" placeholder="cvv"/>
                <ErrorMessage name="cvv" component="div" className="form-validation-alert"/>
              </div>
              <div className="form-group">
                <Field type="month" name="date" className="form-control"
                       placeholder="Credit Card Number"
                       min="2020-09" max="2027-12"/>
                <ErrorMessage name="date" component="div" className="form-validation-alert"/>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  <Cart4 style={Constants.iconStyle}/>
                  Place Order
                </button>
              </div>
              {errorMessage &&
              <div className="alert alert-danger">{errorMessage}</div>
              }
            </Form>
          )
        }
        }
      </Formik>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Title>
          <div><CheckCircleFill style={{ 'marginRight': '10px' }}/>Payed successfully</div>
        </Modal.Title>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user:  state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    finishAction: () => dispatch(actions.finishAction()),
    startAction:  () => dispatch(actions.startAction()),
    setCart:      (cart) => dispatch(actions.setCart(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder)