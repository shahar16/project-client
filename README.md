# Final project - client side

## Index
* [Useful links](#useful-links)
* [Redux](#redux)

## Useful links
* [MongoDB](https://cloud.mongodb.com/v2/5ece78688e3f8d05fdf7385c#metrics/replicaSet/5ece7937125ccd46938b0ff2/explorer/online_shop/users/find)
* [Server side](https://github.com/shahar16/project-server)

[back to top](#index)

##Redux
To add a field to redux state please follow this instructions:
* Add the filed to the initialState in ```src/Store/reducers/app.js```.
* Add the type to ```src/Store/actions/app.js```.
* Add new case to the reducer function in ```src/Store/reducers/app.js```.
* Add the handler for that case in ```src/Store/reducers/app.js```.
* Add the action (the logic) to ```src/Store/actions/app.js```.
* Add the action name to ```src/Store/actions/index.js```.

To connect a component to the relevant actions:
* To connect the state use the method ```mapStateToProps```. Every field that you note in this function will be set as a field in the props of the component. See the example:
* To connect the actions use the method ```mapDispatchToProps```. Every action that you note in this function will be set as a field in the props of the component. See the example:
* Finally, you should connect the component to redux using ```connect``` method from ```react-redux```. See the example below (in this case, the name of the component is TestRedux):
```javascript
import React, { Component } from 'react';
// Redux Connection
import { connect } from "react-redux";
import * as actions from '../Store/actions';


class TestRedux extends Component {

	componentDidMount() {
		this.props.testRedux()
	}


	render() {
		return (
			<div>
				<h1>Hi {this.props.message}</h1>
			</div>
		);
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		testRedux: () => dispatch( actions.test() )
	}
};

const mapStateToProps = ( state ) => {
	return {
		message: state.message
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( TestRedux );


```

[back to top](#index)