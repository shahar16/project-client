import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import NavBar from "./Components/NavBar";
// Components
import TestForms from "./Containers/TestForms";
import './index.css';
import reducer from './Store/reducers/app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, composeEnhancers( applyMiddleware( thunk ) ) );

function App() {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavBar/>
				<TestForms/>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
