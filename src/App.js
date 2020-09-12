import React from 'react'

import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import Main from './Containers/Main'
import './index.css'
import reducer from './Store/reducers/app'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

function App () {

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}

export default App
