import { createSlice } from 'redux-starter-kit'
import decode from 'jwt-decode'
import { setToken } from '/services/api'

const STORAGE_KEY = 'odin:session'

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
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function setSession(data = {}) {
  return async dispatch => {
    dispatch(actions.setSession(data))
    setToken(data.token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function loadSessionFromStorage() {
  return async dispatch => {
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
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

export function hasLevel(loginType, requiredType) {
  const types = {
    User: 1,
    Group: 2,
    'Service Provider': 3,
    Provisioning: 4,
    System: 5
  }
  const user = types[loginType] || 0
  const required = types[requiredType] || 10
  return user >= required
}

export default reducer
