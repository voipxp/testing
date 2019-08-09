import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import userApi from '@/api/users'

const initialState = {}
const load = createAction('USER_LOAD')
const bulk = createAction('USER_BULK')

export const userActions = { bulk, load }

export const userReducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  },
  [bulk]: (state, { payload }) => {
    const { serviceProviderId, groupId, users } = payload
    users.forEach(u => {
      const { userId, user } = u
      state[userId] = { ...user, userId, serviceProviderId, groupId }
    })
  },
  SESSION_CLEAR: () => initialState
})

export const loadUser = userId => {
  return async dispatch => {
    const data = await userApi.show(userId)
    dispatch(load(data))
    return data
  }
}

export const useUser = userId => {
  return {
    user: useSelector(state => state.user[userId]),
    loadUser: useAction(loadUser)
  }
}
