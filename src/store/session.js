import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import decode from 'jwt-decode'
import { setToken } from '@/api'
import { refresh } from '@/api/auth'

const STORAGE_KEY = 'odin:token'

const initialState = {}
const set = createAction('SESSION_SET')
const clear = createAction('SESSION_CLEAR')

export const sessionReducer = createReducer(initialState, {
  [set]: (state, { payload = {} }) => payload,
  [clear]: () => ({})
})

export const clearSession = () => async dispatch => {
  dispatch(clear())
  setToken()
  localStorage.removeItem(STORAGE_KEY)
}

export const setSession = (data = {}) => async dispatch => {
  dispatch(set(data))
  setToken(data.token)
  localStorage.setItem(STORAGE_KEY, data.token)
}

export const loadSessionFromToken = token => async dispatch => {
  if (!token) throw new Error('Token Required')
  const jwt = decode(token)
  const now = new Date().getTime() / 1000
  if (now >= jwt.exp) throw new Error('Token Expired')
  const session = await refresh(token)
  return dispatch(setSession(session))
}

export const loadSessionFromStorage = () => async dispatch => {
  const token = localStorage.getItem(STORAGE_KEY)
  return dispatch(loadSessionFromToken(token))
}

export const useSession = () => {
  const state = useReduxState()
  return {
    session: state.session,
    clearSession: useAction(clearSession),
    setSession: useAction(setSession),
    loadSessionFromToken: useAction(loadSessionFromStorage),
    loadSessionFromStorage: useAction(loadSessionFromStorage)
  }
}
