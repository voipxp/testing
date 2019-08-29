import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import api from '@/api/user-speed-dial-8'
import { userActions } from '@/store/user'

const initialState = {}
const load = createAction('USER_SPEED_DIAL_8_LOAD')
const bulk = createAction('USER_SPEED_DIAL_8_BULK')

export const userSpeedDial8Reducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  },
  [bulk]: (state, { payload }) => {
    const { serviceProviderId, groupId, users } = payload
    users.forEach(u => {
      if (!u.service.assigned) {
        return delete state[u.userId]
      }
      const { userId, data, user } = u
      state[userId] = {
        ...data,
        userId,
        serviceProviderId,
        groupId,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  },
  SESSION_CLEAR: () => initialState
})

export const loadUserSpeedDial8Bulk = (serviceProviderId, groupId) => {
  return async dispatch => {
    const data = await api.index(serviceProviderId, groupId)
    dispatch(bulk(data))
    dispatch(userActions.bulk(data))
    return data
  }
}

export const loadUserSpeedDial8 = userId => {
  return async dispatch => {
    const data = await api.show(userId)
    dispatch(load(data))
    return data
  }
}

export const updateUserSpeedDial8Bulk = bulkData => {
  return async dispatch => {
    const data = await api.bulk(bulkData)
    dispatch(bulk(data))
    dispatch(userActions.bulk(data))
    return data
  }
}

export const updateUserSpeedDial8 = speedCodes => {
  return async dispatch => {
    const data = await api.update(speedCodes)
    dispatch(load(data))
    return data
  }
}

export const useUserSpeedDial8Bulk = (serviceProviderId, groupId) => {
  return {
    userSpeedDial8Bulk: useSelector(state => {
      return Object.values(state.userSpeedDial8).filter(
        user =>
          user.serviceProviderId === serviceProviderId &&
          user.groupId === groupId
      )
    }),
    loadUserSpeedDial8Bulk: useAction(loadUserSpeedDial8Bulk),
    updateUserSpeedDial8Bulk: useAction(updateUserSpeedDial8Bulk)
  }
}

export const useUserSpeedDial8 = userId => {
  return {
    userSpeedDial8: useSelector(state => state.userSpeedDial8[userId]),
    loadUserSpeedDial8: useAction(loadUserSpeedDial8),
    updateUserSpeedDial8: useAction(updateUserSpeedDial8)
  }
}
