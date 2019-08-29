import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import api from '@/api/user-registrations'

const initialState = {}
const load = createAction('USER_REGISTRATION_LOAD')

export const userRegistrationReducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  },
  SESSION_CLEAR: () => initialState
})

export const loadUserRegistration = userId => {
  return async dispatch => {
    const userRegistration = await api.show(userId)
    dispatch(load(userRegistration))
    return userRegistration
  }
}

export const useUserRegistration = userId => {
  return {
    userRegistration: useSelector(state => state.userRegistration[userId]),
    loadUserRegistration: useAction(loadUserRegistration)
  }
}
