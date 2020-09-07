import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Error from '../Components/Error'
import Footer from '../Components/Footer'
import ModalForEditUser from '../Components/modals/ModalForEditUser'
import NavBar from '../Components/NavBar'
import ProductsGalleryView from '../Components/products/galleryView/ProductsGalleryView'
import CartService from '../Services/cart.service'
import ProductService from '../Services/product.test.service'
import * as actions from '../Store/actions'
import MyCart from './MyCart'
import ProductPage from './ProductPage'
import SearchResults from './SearchResults'
import SingleOrder from './SingleOrder'
import StoreManagementPage from './StoreManagementPage'
import StorePage from './StorePage'
import UserOrdersPage from './UserOrdersPage'

function HomePage (props) {

  useEffect(() => {
    props.checkAuth()
    fetchCart()
  }, [props])

  const getHomePageProducts = async (init) => {
    return await ProductService.getHomePageProducts(init)
  }

  const fetchCart = async () => {
    try {
      const res = await CartService.getCart(props.token)
      props.setCart(res)
    } catch (e) {
      props.setCart(null)
    }
  }

  return (
    <BrowserRouter>
      <Route component={NavBar}/>
      <div className="under-nav-bar">
        <Switch>
          {/*http://localhost:3000/login*/}
          <Route exact
                 path="/"
                 render={(props) => (
                   <ProductsGalleryView {...props} fetchService={getHomePageProducts}/>
                 )}
          />
          <Route exact
                 path="/edit-profile"
                 component={ModalForEditUser}
          />
          {/*http://localhost:3000/products/e3725de0-bd33-4d2a-a05e-dd6c7cbd5601/123456*/}
          <Route exact
                 path="/products/:storeID/:sn"
                 component={ProductPage}
          />
          {/*http://localhost:3000/my-stores*/}
          <Route exact
                 path="/my-stores"
                 component={StoreManagementPage}
          />
          <Route exact
                 path="/my-cart"
                 component={MyCart}
          />
          {/*http://localhost:3000/stores/e3725de0-bd33-4d2a-a05e-dd6c7cbd5601*/}
          <Route exact
                 path="/stores/:storeID"
                 component={StorePage}
          />
          <Route exact
                 path="/search/:query"
                 component={SearchResults}
          />
          <Route exact
                 path="/my-orders"
                 component={UserOrdersPage}
          />
          <Route exact
                 path="/orders/:orderID"
                 component={SingleOrder}
          />
          <Route path="*" component={Error}/>
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(actions.checkState()),
    setCart:   (cart) => dispatch(actions.setCart(cart))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)