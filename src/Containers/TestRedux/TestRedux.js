import React, { Component } from 'react';
// Redux Connection
import { connect } from "react-redux";
import * as actions from '../../Store/actions/index';
import './TestRedux.css';


class TestRedux extends Component {

	componentDidMount() {
		this.props.checkAuth();
		this.props.testRedux();
		this.props.shahar( this.props.name )
	}


	render() {
		return (
			<div>
				<h1>Hi {this.props.shaharMessage}</h1>
			</div>
		);
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		testRedux: () => dispatch( actions.test() ),
		checkAuth: () => dispatch( actions.checkState() ),
		shahar:    ( name ) => dispatch( actions.shahar( name ) )
	}
};

const mapStateToProps = ( state ) => {
	return {
		message:       state.message,
		shaharMessage: state.shaharMessage
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( TestRedux );

