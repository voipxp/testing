import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
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
  setToken()
  dispatch(clear())
  localStorage.removeItem(STORAGE_KEY)
}

export const setSession = (data = {}) => async dispatch => {
  setToken(data.token)
  dispatch(set(data))
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
  return {
    session: useSelector(state => state.session),
    clearSession: useAction(clearSession),
    setSession: useAction(setSession),
    loadSessionFromToken: useAction(loadSessionFromStorage),
    loadSessionFromStorage: useAction(loadSessionFromStorage)
  }
}
