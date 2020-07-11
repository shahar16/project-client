import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import TestRedux from './Containers/TestRedux/TestRedux';
import './index.css';
import reducer from './Store/reducers/app';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, composeEnhancers( applyMiddleware( thunk ) ) );

function App() {
	const [ token, setToken ] = useState( null );
	const [ needToSignUp, setNeedToSignUp ] = useState( false );

	return (
		<Provider store={store}>
			<BrowserRouter>
				<TestRedux name="shahar"/>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
