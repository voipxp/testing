import { createSlice } from 'redux-starter-kit'
import decode from 'jwt-decode'
import { setToken } from '@/api'
import { refresh } from '@/api/auth'

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
  console.log('setSession', data)
  dispatch(actions.setSession(data))
  setToken(data.token)
  localStorage.setItem(STORAGE_KEY, data.token)
}

export const loadSessionFromStorage = () => async dispatch => {
  console.log('loadSessionFromStorage')
  try {
    const token = localStorage.getItem(STORAGE_KEY)
    console.log('token', token)
    if (!token) return dispatch(clearSession())
    const jwt = decode(token)
    console.log('jwt', jwt)
    const now = new Date().getTime() / 1000
    if (now < jwt.exp) {
      setToken(token)
      const session = await refresh()
      console.log('refresh', session)
      return dispatch(setSession(session))
    } else {
      return dispatch(clearSession())
    }
  } catch (error) {
    console.log('error', error)
    return dispatch(clearSession())
  }
}
