import { createAction, createReducer } from 'redux-starter-kit'
import { useAction } from './hooks'
import { useSelector } from 'react-redux'
import serviceProviderApi from '@/api/service-providers'

const initialState = []
const load = createAction('SERVICE_PROVIDERS_LOAD')

export const serviceProvidersReducer = createReducer(initialState, {
  [load]: (state, { payload = [] }) => payload,
  SESSION_CLEAR: () => initialState
})

export const loadServiceProviders = () => {
  return async dispatch => {
    const providers = await serviceProviderApi.list()
    dispatch(load(providers))
    return providers
  }
}

export const useServiceProviders = () => {
  return {
    serviceProviders: useSelector(state => state.serviceProviders),
    loadServiceProviders: useAction(loadServiceProviders)
  }
}
