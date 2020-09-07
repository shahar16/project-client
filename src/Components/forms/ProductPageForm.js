import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { CheckCircleFill } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CartService from '../../Services/cart.service'
import UserService from '../../Services/user.service'
import * as actions from '../../Store/actions'
import ModalForEditProduct from '../modals/ModalForEditProduct'

const ProductPageForm = ({ item, token, user, afterEdit, setCart }) => {
  const [isOwner, setIsOwner] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [show, setShow] = useState(false)
  let history = useHistory()

  useEffect(() => {
    setIsOwner(user ? item.owner === user.email : false)
  }, [item])

  const handleClose = () => {
    setShow(false)
    setErrorMessage(null)
  }

  const fetchCart = async () => {
    try {
      const res = await CartService.getCart(token)
      setCart(res)
    } catch (e) {
      setCart(null)
    }
  }

  const handleSubmit = async (values) => {
    if (!token) {
      setErrorMessage('You need to login first')
      return
    }

    const data = {
      sn:           item.sn,
      storeID:      item.storeID,
      categoryName: values.categoryType,
      quantity:     values.quantity
    }

    try {
      await UserService.addToCart(data, token)
      await fetchCart()
      setShow(true)
      setTimeout(handleClose, 1000)
    } catch (e) {
      await console.log(e)
      setErrorMessage(e.message)
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          categoryType: `Choose ${item.stock.type}`,
          quantity:     'Choose quantity'
        }}
        onSubmit={handleSubmit}>
        {({ values, handleChange }) => {
          return (
            <Form>
              <Row>
                <Col>
                  <div className="form-group">
                    <label>Choose {item.stock.type}</label>
                    <Field as="select"
                           name="categoryType"
                           className="form-control"
                           onChange={handleChange}
                    >
                      <option value={`Choose ${item.stock.type}`}
                              defaultValue>Choose {item.stock.type}</option>
                      {Object.keys(item.stock.quantities).map((key, index) => <option
                        disabled={item.stock.quantities[key] <= 0}
                        value={key}
                        selected={index === 0}>{key}</option>)}
                    </Field>
                  </div>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <div className="form-group">
                    <label>Choose quantity</label>
                    <Field as="select" name="quantity" className="form-control">
                      <option value='Choose quantity' defaultValue>Choose quantity</option>
                      {
                        item.stock.quantities[values.categoryType] > 0 && Array.apply(null, Array(item.stock.quantities[values.categoryType])).map((_, index) =>
                          <option>{index + 1}</option>)
                      }
                      {
                        item.stock.quantities[values.categoryType] <= 0 &&
                        <option disabled>no items left from this {item.stock.type}</option>
                      }
                    </Field>
                  </div>
                </Col>
              </Row>
              <hr/>
              <br/>
              <Row>
                <Col>
                  <Button variant="primary"
                          type="submit"
                          block
                          disabled={values.categoryType === `Choose ${item.stock.type}` || values.quantity === 'Choose quantity'}
                  >Add to cart</Button>
                </Col>
                <Col>
                  <Button
                    variant="success"
                    type="submit"
                    onClick={() => {
                      setTimeout(() => {
                        history.push('/my-cart')
                      }, 1000)
                    }}
                    block
                    disabled={values.categoryType === `Choose ${item.stock.type}` || values.quantity === 'Choose quantity'}
                  >Buy it now</Button>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  {errorMessage &&
                  <div className="alert alert-danger">{errorMessage}</div>
                  }
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  {token && isOwner &&
                  <ModalForEditProduct productToEdit={item} storeID={item.storeID}
                                       afterEdit={afterEdit}/>}
                </Col>
              </Row>
            </Form>
          )
        }
        }
      </Formik>
      <Modal show={show} onHide={handleClose}>
        <Modal.Title>
          <div><CheckCircleFill style={{ 'marginRight': '10px' }}/>Product added to cart successfully</div>
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
    setCart: (cart) => dispatch(actions.setCart(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageForm)