import { createSlice } from 'redux-starter-kit'
import decode from 'jwt-decode'
import { setToken } from '/api'

const STORAGE_KEY = 'odin:session'

const slice = createSlice({
  slice: 'session',
  initialState: {},
  reducers: {
    setSession: (state, { payload }) => payload || {},
    clearSession: () => ({})
  }
})

const { actions, reducer } = slice
export default reducer

export const clearSession = () => async dispatch => {
  dispatch(actions.clearSession())
  setToken()
  localStorage.removeItem(STORAGE_KEY)
}

export const setSession = (data = {}) => async dispatch => {
  dispatch(actions.setSession(data))
  setToken(data.token)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const loadSessionFromStorage = () => async dispatch => {
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

// TODO: implement PaasAdmin
export const hasLevel = (loginType, requiredType) => {
  const types = {
    'User': 1,
    'Group': 2,
    'Service Provider': 3,
    'Provisioning-PaasAdmin': 3.5,
    'Provisioning': 4,
    'System': 5
  }
  const user = types[loginType] || 0
  const required = types[requiredType] || 10
  return user >= required
}

export const hasGroup = loginType => hasLevel(loginType, 'Group')
export const hasServiceProvider = loginType =>
  hasLevel(loginType, 'Service Provider')
export const hasProvisioning = loginType => hasLevel(loginType, 'Provisioning')
export const hasSystem = loginType => hasLevel(loginType, 'System')
