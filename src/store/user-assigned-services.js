import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import userServicesApi from '@/api/user-services'

const initialState = {}
const load = createAction('USER_ASSIGNED_SERVICES_LOAD')

export const userAssignedServicesReducer = createReducer(initialState, {
  [load]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  }
})

export const loadUserAssignedServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.assigned(userId)
    dispatch(load(services))
    return services
  }
}

export const useUserAssignedServices = userId => {
  const state = useReduxState()
  return {
    userAssignedServices: state.userAssignedServices[userId],
    loadUserAssignedServices: useAction(loadUserAssignedServices)
  }
}
