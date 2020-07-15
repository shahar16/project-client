import React  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import TestRedux from './Containers/TestRedux';
import ProductsList from "./Components/ProductsList";
import './index.css';
import reducer from './Store/reducers/app';

import TestForms from "./Containers/TestForms";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, composeEnhancers( applyMiddleware( thunk ) ) );

function App() {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<TestRedux name="shahar"/>
				<ProductsList />
				<TestForms />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
