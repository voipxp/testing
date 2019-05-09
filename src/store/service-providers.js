import { createSlice } from 'redux-starter-kit'
import { useAction } from './hooks'
import { useReduxState } from 'reactive-react-redux'
import serviceProviderApi from '@/api/service-providers'

/*
  state.serviceProviders = [
    { serviceProviderId, ... }
  ]
*/
const { actions, reducer } = createSlice({
  slice: 'serviceProviders',
  initialState: [],
  reducers: {
    setServiceProviders: (state, { payload }) => payload || []
  }
})

export { reducer as serviceProvidersReducer }

export const loadServiceProviders = () => {
  return async dispatch => {
    const providers = await serviceProviderApi.list()
    dispatch(actions.setServiceProviders(providers))
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
