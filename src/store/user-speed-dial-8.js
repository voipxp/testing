import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import api from '@/api/user-speed-dial-8'
import userSpeedDial8 from '@/api/user-speed-dial-8'

const initialState = {}
const load = createAction('USER_SPEED_DIAL_8_LOAD')
const bulk = createAction('USER_SPEED_DIAL_8_BULK')

export const userSpeedDial8Reducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  },
  [bulk]: (state, { payload }) => {
    return payload.users.reduce((obj, user) => {
      obj[user.userId] = user.data
      return obj
    }, {})
  }
})

export const loadUserSpeedDial8Bulk = (serviceProviderId, groupId) => {
  return async dispatch => {
    const userSpeedDial8Bulk = await api.index(serviceProviderId, groupId)
    dispatch(bulk(userSpeedDial8Bulk))
    return userSpeedDial8Bulk
  }
}

export const loadUserSpeedDial8 = userId => {
  return async dispatch => {
    const userSpeedDial8 = await api.show(userId)
    dispatch(load(userSpeedDial8))
    return userSpeedDial8
  }
}

export const updateUserSpeedDial8Bulk = user => {}
export const updateUserSpeedDial8 = speedCodes => {
  return async dispatch => {
    const data = await api.update(speedCodes)
    dispatch(load(data))
    return data
  }
}

export const useUserSpeedDial8Bulk = (serviceProviderId, groupId) => {
  return {
    loadUserSpeedDial8Bulk: useAction(loadUserSpeedDial8Bulk)
  }
}

export const useUserSpeedDial8 = userId => {
  return {
    userSpeedDial8: useSelector(state => state.userSpeedDial8[userId]),
    loadUserSpeedDial8: useAction(loadUserSpeedDial8),
    updateUserSpeedDial8: useAction(updateUserSpeedDial8)
  }
}
