import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Table } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import CartTd from '../Components/Cart/CartTd'
import OrderSummary from '../Components/Cart/OrderSummary'
import cartEmpty from '../resources/images/shopping-cart-empty.png'
import CartService from '../Services/cart.service'
import * as actions from '../Store/actions'

function MyCart (props) {
  const [cart, setCart] = useState(null)
  const [forceRender, setForceRender] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await CartService.getCart(props.token)
        setCart(res)
        props.setCart(res)
      } catch (e) {
        setCart(null)
        props.setCart(null)
      }
    }

    fetchCart()
  }, [props.token, forceRender])

  const afterUpdate = () => {
    setForceRender(!forceRender)
    setCart(null)
  }

  const afterPay = () => {
    props.history.push('/')
  }

  return (
    <div>
      <Helmet>
        <title>My Cart</title>
      </Helmet>
      <br/>
      {props.token && cart && cart.products.length > 0 && <Row>
        <Col md={1}></Col>
        <Col md={8}>
          <Table responsive hover style={{ 'marginTop': '2px' }}>
            <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {cart && cart.products.map((product, index) =>
              <CartTd
                product={product}
                index={index}
                key={`${product.id}`}
                callBack={afterUpdate}
              />)}
            </tbody>
          </Table>
        </Col>
        <Col md={3}>
          {cart && <OrderSummary cart={cart} afterPay={afterPay}/>}
        </Col>
        {/*<Col md={1}></Col>*/}
      </Row>}
      {!props.token && <h1>You need to login first</h1>}
      {props.token && !cart &&
      <Image src={cartEmpty}/>
      }
      {props.token && cart && cart.products.length === 0 && <Image src={cartEmpty}/>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch(actions.setCart(cart))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)