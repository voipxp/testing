import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
// import { loadUserAssignedServices } from './user-assigned-services'
import groupServicesApi from '@/api/group-services'

const initialState = {}
const load = createAction('GROUP_SERVICES_LOAD')

export const groupServicesReducer = createReducer(initialState, {
  [load]: (state, { payload = {} }) => payload.services,
  SESSION_CLEAR: () => initialState
})

export const loadGroupServices = (groupId, serviceProviderId) => {
  return async dispatch => {
    const services = await groupServicesApi.available(groupId, serviceProviderId)
    dispatch(load( { groupId: groupId, services: services} ))
    return services
  }
}


export const useGroupServices = (groupId, serviceProviderId) => {
  return {
    groupServices: useSelector(state => state.groupServices),
    loadGroupServices: useAction(loadGroupServices)
  }
}