import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import userServicesApi from '@/api/user-services'

const initialState = {}
const set = createAction('USER_ASSIGNED_SERVICES_LOAD')

export const userAssignedServicesReducer = createReducer(initialState, {
  [set]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  }
})

export const loadUserAssignedServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.assigned(userId)
    dispatch(set(services))
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
