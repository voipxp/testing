import { createSlice } from 'redux-starter-kit'
import decode from 'jwt-decode'
import { setToken } from '@/api'

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
