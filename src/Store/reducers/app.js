import { updateObject } from '../../Shared/Util/Util';
import * as actionTypes from '../actions/actionTypes';


// Todo 1: add need prop to state
const initialState = {
	token:         null,
	error:         null,
	loading:       null,
	//TODO : remove - only for practice
	message:       null,
	shaharMessage: null
}

//TODO : remove - only for practice
const test = ( state, action ) => {
	return updateObject( state, {
		message: action.message
	} );
}
const shahar = ( state, action ) => {
	return updateObject( state, {
		shaharMessage: action.shaharMessage
	} );
}

// Todo 4  : Add the handler for that case.


const startAction = ( state, action ) => {
	return updateObject( state, {
		error:   null,
		loading: true
	} );
};

const finishAction = ( state, action ) => {
	return updateObject( state, {
		error:   null,
		loading: false
	} );
}

const authSuccess = ( state, action ) => {
	return updateObject( state, {
		token: action.token,
		error: null
	} );
}
const authFail = ( state, action ) => {
	return updateObject( state, {
		error:   action.error,
		loading: false,
		token:   null
	} );
}

const authLogout = ( state, action ) => {
	return updateObject( state, {
		token:   null,
		error:   null,
		loading: false
	} );
}


// Todo 3  : Add the new case.

const reducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case actionTypes.TEST://TODO : remove - only for practice
			return test( state, action );
		case actionTypes.START_ACTION:
			return startAction( state, action );
		case actionTypes.FINISH_ACTION:
			return finishAction( state, action );
		case actionTypes.AUTH_SUCCESS:
			return authSuccess( state, action );
		case actionTypes.AUTH_FAIL:
			return authFail( state, action );
		case actionTypes.AUTH_LOGOUT:
			return authLogout( state, action );
		case actionTypes.SHAHAR_TEST://TODO : remove - only for practice
			return shahar( state, action );
		default:
			return state;
	}
}

export default reducer;
