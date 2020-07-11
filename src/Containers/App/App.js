import React, {Component} from 'react';
import './App.css';

// Redux Connection
import {connect} from "react-redux";
import * as actions from '../../Store/actions/index';


class App extends Component {

    componentDidMount() {
        this.props.checkAuth();
        this.props.testRedux();
    }


    render() {
        return (
            <div>
                <h1>Hi Amir Kirsh I want to fuck you....</h1>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        testRedux: () => dispatch(actions.test()),
        checkAuth: () => dispatch(actions.checkState())
    }
};

const mapStateToProps = (state) => {
    return {
        message: state.message
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(App);

