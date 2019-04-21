import { createSlice } from 'redux-starter-kit'
import decode from 'jwt-decode'
import { setToken } from '@/api'
import { refresh } from '@/api/auth'

const STORAGE_KEY = 'odin:token'

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
  localStorage.setItem(STORAGE_KEY, data.token)
}

export const loadSessionFromStorage = () => async dispatch => {
  try {
    const token = localStorage.getItem(STORAGE_KEY)
    if (!token) throw new Error('Token Required')
    const jwt = decode(token)
    const now = new Date().getTime() / 1000
    if (now >= jwt.exp) throw new Error('Token Expired')
    const session = await refresh(token)
    return dispatch(setSession(session))
  } catch (error) {
    return dispatch(clearSession())
  }
}
