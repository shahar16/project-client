import { updateObject } from '../../Shared/Util/Util'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token:         null,
  error:         null,
  loading:       null,
  user:          null,
  //TODO : remove - only for practice
  message:       null,
  shaharMessage: null
}

//TODO : remove - only for practice
const test = (state, action) => {
  return updateObject(state, {
    message: action.message
  })
}
const shahar = (state, action) => {
  return updateObject(state, {
    shaharMessage: action.shaharMessage
  })
}

const startAction = (state, action) => {
  return updateObject(state, {
    error:   null,
    loading: true
  })
}

const finishAction = (state, action) => {
  return updateObject(state, {
    error:   null,
    loading: false
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token:   action.token,
    loading: false,
    error:   null
  })
}
const authFail = (state, action) => {
  return updateObject(state, {
    error:   action.error,
    loading: false,
    token:   null
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token:   null,
    error:   null,
    loading: false
  })
}

const setUser = (state, action) => {
  return updateObject(state, {
    user: action.user
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEST://TODO : remove - only for practice
      return test(state, action)
    case actionTypes.START_ACTION:
      return startAction(state, action)
    case actionTypes.FINISH_ACTION:
      return finishAction(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    case actionTypes.SHAHAR_TEST://TODO : remove - only for practice
      return shahar(state, action)
    case actionTypes.SET_USER:
      return setUser(state, action)
    default:
      return state
  }
}

export default reducer
