import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import api from '@/api/user-intercept'

const initialState = {}
const load = createAction('USER_USER_INTERCEPT_LOAD')

export const userUserInterceptReducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  }
})

export const loadUserIntercept = userId => {
  return async dispatch => {
    const intercept = await api.show(userId)
    console.log(intercept)
    dispatch(load(intercept))
    return intercept
  }
}

export const updateUserIntercept = intercept => {
  return async dispatch => {
    const data = await api.update(intercept)
    dispatch(load(data))
    return data
  }
}

export const useUserIntercept = userId => {
  return {
    userUserIntercept: useSelector(state => state.userIntercept[userId]),
    loadUserIntercept: useAction(loadUserIntercept),
    updateUserIntercept: useAction(updateUserIntercept)
  }
}
