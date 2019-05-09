import { createAction, createReducer } from 'redux-starter-kit'
import { useAction } from './hooks'
import { useReduxState } from 'reactive-react-redux'
import serviceProviderApi from '@/api/service-providers'

const initialState = []
const set = createAction('SERVICE_PROVIDERS_LOAD')

export const serviceProvidersReducer = createReducer(initialState, {
  [set]: (state, { payload = [] }) => payload
})

export const loadServiceProviders = () => {
  return async dispatch => {
    const providers = await serviceProviderApi.list()
    dispatch(set(providers))
    return providers
  }
}

export const useServiceProviders = () => {
  const state = useReduxState()
  return {
    serviceProviders: state.serviceProviders,
    loadServiceProviders: useAction(loadServiceProviders)
  }
}
