import * as actionsTypes from './actionTypes'

export const startAction = () => {
  return {
    type: actionsTypes.START_ACTION,
  }
}

export const finishAction = () => {
  return {
    type: actionsTypes.FINISH_ACTION,
  }
}

export const authSuccess = (token) => {
  return {
    token: token,
    type:  actionsTypes.AUTH_SUCCESS,
  }
}

export const authFail = (err) => {
  return {
    error: err,
    type:  actionsTypes.AUTH_FAIL,
  }
}

export const authLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')

  return {
    token: null,
    user:  null,
    type:  actionsTypes.AUTH_LOGOUT,
  }
}

export const setAuthincationTimeOut = (experationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout())
    }, experationTime)
  }
}

export const setUser = (user) => {
  return {
    user: user,
    type: actionsTypes.SET_USER
  }
}

export const checkState = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(authLogout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(authLogout())
      } else {
        dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
        dispatch(authSuccess(token))
        const timeToLoggout = expirationDate.getTime() - new Date().getTime()
        dispatch(setAuthincationTimeOut(timeToLoggout))
      }
    }
  }
}

export const setCart =(cart) => {
  return {
    cart: cart,
    type: actionsTypes.SET_CART
  }
}
