import React, { useEffect, useState } from 'react'
import { Badge, Image, Nav, Navbar } from 'react-bootstrap'
import { Cart4, CartCheck, House, Person, PersonDash, Shop } from 'react-bootstrap-icons'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import img from '../resources/images/nav-bar-image.jpg'
import logo from '../resources/images/store-line-logo.png'
import Constants from '../Shared/Util/Constants'
import * as actions from '../Store/actions'
import ModalForAuth from './modals/ModalForAuth'
import SearchBox from './SearchBox'

function NavBar (props) {
  let listener = null
  const [scrollState, setScrollState] = useState('top')

  const linkStyle = {
    'marginRight': '20px'
  }

  useEffect(() => {
    listener = document.addEventListener('scroll', e => {
      let scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 375) {
        setScrollState('full-opacity')
      } else if (scrolled >= 300) {
        setScrollState('high-opacity')
      } else if (scrolled >= 200) {
        setScrollState('mid-opacity')
      } else if (scrolled >= 100) {
        setScrollState('low-opacity')
      } else {
        setScrollState('top')
      }
    })
    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [scrollState])

  const getStyle = () => {
    let style = {
      'backgroundSize': '100%',
    }

    switch (scrollState) {
      case 'low-opacity':
        style['opacity'] = '25%'
        break
      case 'mid-opacity':
        style['opacity'] = '50%'
        break
      case 'high-opacity':
        style['opacity'] = '75%'
        break
      case 'full-opacity':
        style['opacity'] = '100%'
        break
    }
    return style
  }

  const getUserMessage = () => {
    if (props.token) {
      return `Hi ${props.user.firstName} ${props.user.lastName}`
    } else {
      return <div style={{ display: 'inline-flex' }}>
        <span style={{ marginRight: '10px' }}>Hi, please </span><ModalForAuth signUp={false} text="Log In"/>
        <span style={{ marginRight: '7px', marginLeft: '7px' }}>or</span> <ModalForAuth signUp={true}
                                                                                        text="Sign Up"/>
      </div>
    }
  }

  return (
    <div>
      <Image src={img} className="shadow" fluid/>
      <Navbar bg={scrollState === 'top' ? 'non' : 'light'} variant="light" fixed="top"
              style={getStyle()} className="shadow">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {getUserMessage()}
            </Navbar.Text>
          </Navbar.Collapse>
        </Nav>
        <Link to="/" style={linkStyle}><House style={Constants.iconStyle}/>Home</Link>
        <Link to="/my-stores" style={linkStyle}><Shop style={Constants.iconStyle}/>My Stores</Link>
        {props.cart && props.cart.products.length <= 0  && <Link to="/my-cart" style={linkStyle}><Cart4 style={Constants.iconStyle}/>My Cart</Link>}
        {!props.cart &&  <Link to="/my-cart" style={linkStyle}><Cart4 style={Constants.iconStyle}/>My Cart</Link>}
        {props.cart && props.cart.products.length > 0 && <Link to="/my-cart" style={linkStyle}><Badge pill variant="danger"
                                                                                                      style={Constants.iconStyle}>{props.cart.products.length}</Badge><Cart4 style={Constants.iconStyle}/>My
          Cart</Link>}
        <Link to="/my-orders" style={linkStyle}><CartCheck style={Constants.iconStyle}/>My Orders</Link>
        {props.token &&
        <Link to="/edit-profile" style={linkStyle}><Person style={Constants.iconStyle}/>Edit Profile</Link>}
        {props.token &&
        <Link onClick={() => props.authLogout()} style={linkStyle}><PersonDash style={Constants.iconStyle}/>Log
          Out</Link>}

        <SearchBox history={props.history}/>
      </Navbar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user:  state.user,
    token: state.token,
    cart:  state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)