import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import userApi from '@/api/users'

const initialState = {}
const load = createAction('USER_LOAD')

export const userReducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  }
})

export const loadUser = userId => {
  return async dispatch => {
    const services = await userApi.show(userId)
    dispatch(load(services))
    return services
  }
}

export const useUser = userId => {
  return {
    user: useSelector(state => state.user[userId]),
    loadUser: useAction(loadUser)
  }
}
