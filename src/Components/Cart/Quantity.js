import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import CartService from '../../Services/cart.service'

function Quantity ({ quantity, product, token, callBack }) {
  const [edit, setEdit] = useState(false)

  const update = async (values) => {
    console.log(values)
    const data = {
      id:           product.id,
      sn:           product.sn,
      storeID:      product.storeID,
      categoryName: product.categoryName,
      quantity:     parseInt(values.quantity)
    }
    console.log(data)

    try {
      await CartService.updateItem(data, token)
      callBack()
    } catch (e) {
      await console.log(e.data.message)
    }
  }

  return (
    <div>
      {quantity && <Formik
        initialValues={{
          quantity: quantity
        }}
        onSubmit={update}>
        {({ setFieldValue }) => {
          return (
            <Form>
              <Row>
                <Col md={4}></Col>
                <Col>
                  <div className="form-group">
                    <Field type="number"
                           name="quantity"
                           className="form-control"
                           style={{ width: '70px' }}
                           min="1"
                           onChange={(v) => {
                             setFieldValue('quantity', v.target.value)
                             if (parseInt(v.target.value) === quantity) {
                               setEdit(false)
                             } else {
                               setEdit(true)
                             }
                           }}/>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <button type="submit"
                            className="btn btn-success"
                            disabled={!edit}
                    >
                      update
                    </button>
                  </div>
                </Col>
                <Col md={4}></Col>
              </Row>
              {/*{errorMessage &&*/}
              {/*<div className="alert alert-danger">{errorMessage}</div>*/}
              {/*}*/}
            </Form>
          )
        }
        }
      </Formik>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, null)(Quantity)