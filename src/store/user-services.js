import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import { loadUserAssignedServices } from './user-assigned-services'
import userServicesApi from '@/api/user-services'

const initialState = {}
const load = createAction('USER_SERVICES_LOAD')

export const userServicesReducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  },
  SESSION_CLEAR: () => initialState
})

export const loadUserServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.show(userId)
    dispatch(load(services))
    return services
  }
}

export const updateUserServices = services => {
  return async dispatch => {
    const data = await userServicesApi.update(services)
    dispatch(load(data))
    dispatch(loadUserAssignedServices(services.userId))
    return data
  }
}

export const useUserServices = userId => {
  return {
    userServices: useSelector(state => state.userServices[userId]),
    loadUserServices: useAction(loadUserServices),
    updateUserServices: useAction(updateUserServices)
  }
}
