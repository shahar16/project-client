// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { applyMiddleware, compose, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import App from './Containers/App/App';
// import './index.css';
// import * as serviceWorker from './serviceWorker';
// import reducer from './Store/reducers/app';
//
//
// // Routes Configurations
//
// // redux configurations
//
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore( reducer, composeEnhancers( applyMiddleware( thunk ) ) );
//
// const app = (
// 	<Provider store={store}>
// 		<BrowserRouter>
// 			<App name="roy"/>
// 		</BrowserRouter>
// 	</Provider>
// )
//
// ReactDOM.render( app,
// 	document.getElementById( 'root' )
// );
//
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
