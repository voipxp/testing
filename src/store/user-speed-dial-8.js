import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import api from '@/api/user-speed-dial-8'

const initialState = {}
const bulk = createAction('USER_SPEED_DIAL_8_BULK')

export const userSpeedDial8Reducer = createReducer(initialState, {
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
    return data
  }
}

export const updateUserSpeedDial8Bulk = bulkData => {
  return async dispatch => {
    const data = await api.bulk(bulkData)
    dispatch(bulk(data))
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
