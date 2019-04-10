import { createSlice } from 'redux-starter-kit'
import decode from 'jwt-decode'
import { setToken } from '/services/api'

let initialState = {}

const slice = createSlice({
  slice: 'session',
  initialState,
  reducers: {
    setSession: (state, { payload }) => payload || {},
    clearSession: () => ({})
  }
})

const { actions, reducer } = slice

export function clearSession() {
  return async dispatch => {
    dispatch(actions.clearSession())
    setToken()
  }
}

export function setSession(data = {}) {
  return async dispatch => {
    dispatch(actions.setSession(data))
    setToken(data.token)
  }
}

export function loadSessionFromStorage() {
  return async dispatch => {
    try {
      const session = JSON.parse(localStorage.getItem('odin:session')) || {}
      const jwt = decode(session.token)
      const now = new Date().getTime() / 1000
      if (now < jwt.exp) {
        dispatch(setSession(session))
      } else {
        dispatch(clearSession())
      }
    } catch (error) {
      dispatch(clearSession())
    }
  }
}

export default reducer
