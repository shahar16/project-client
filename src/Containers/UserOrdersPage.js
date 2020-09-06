import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import OrderTd from '../Components/UserOrders/OrderTd'
import OrderService from '../Services/order.service'

function UserOrdersPage (props) {
  const [ordersState, setOrdersState] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [props.token])

  const fetchOrders = async () => {
    try {
      console.log('fetch user orders')
      console.log(props.token)
      const userOrders = await OrderService.getUserOrders(props.token)
      console.log(userOrders)
      setOrdersState(userOrders)
    } catch (err) { }
  }

  const userHaveOrders = () => {
    console.log('order state length: ')
    console.log(ordersState)
    if (ordersState) {
      return ordersState.length > 0
    } else {
      return false
    }
  }
  return (
    <div>
      <br/>
      {props.token && <Row>
        <Col md={1}></Col>
        <Col md={10}>
          {/*<Jumbotron  style={Constants.productPageStyle}>*/}
          {!userHaveOrders() && <h4>you didn't place any order.. come on!</h4>}
          {/* <Row>
           <Col md={10}></Col>
           <Col md={2}><ModalForNewStore onSubmit={fetchOrders} /> </Col>
           <Col md={1}></Col>
           </Row> */}
          <Table responsive hover style={{ 'marginTop': '2px' }}>
            <thead>
            <tr>
              <th>#</th>
              <th/>
              <th>Order ID</th>
              <th>Total Sum</th>
              <th>Order Date</th>
              <th>Estimated Shipping date</th>
            </tr>
            </thead>
            <tbody>
            {userHaveOrders() && ordersState.map((singleOrder, index) => <OrderTd order={singleOrder} index={index}
                                                                                  key={singleOrder.id}/>)}
            </tbody>
          </Table>
          {/*</Jumbotron>*/}
        </Col>
        <Col md={1}></Col>
      </Row>}
      {!props.token && <h1>You need to login first</h1>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token
    //user: state.user
  }
}

export default connect(mapStateToProps, null)(UserOrdersPage)