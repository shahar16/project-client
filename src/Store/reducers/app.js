import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../Shared/Util/Util';


// Todo 1: add need prop to state
const initialState = {
    token: null, 
    error: null, 
    loading: null,
    message: null
}



const test = (state, action) => {
    return updateObject(state, {message: action.message});
}

// Todo 4  : Add the handler for that case.


const startAction = (state, action) => {
    return updateObject(state, {error: null, loading: true})
};

const finishAction = (state, action) => {
    return updateObject(state, {error: null, loading: false});
}

const authSuccess = (state, action) => {
    return updateObject(state, {token: action.token});
}
const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false, token: false});
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, error: null, loading: false});
}


// Todo 3  : Add the new case.

const reducer = (state= initialState, action) => {
    switch (action.type){
        case actionTypes.TEST:
            return test(state,action);
        case actionTypes.START_ACTION:
            return startAction(state, action);
        case actionTypes.FINISH_ACTION:
            return finishAction(state, action);
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: 
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: 
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;
