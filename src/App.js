import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import HomePage from "./Containers/HomePage";
import './index.css';
import reducer from './Store/reducers/app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, composeEnhancers( applyMiddleware( thunk ) ) );

function App( props ) {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<HomePage/>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
