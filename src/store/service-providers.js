import { createSlice } from 'redux-starter-kit'
import serviceProviders from '/api/service-providers'

const slice = createSlice({
  slice: 'serviceProviders',
  initialState: [],
  reducers: {
    setServiceProviders: (state, { payload }) => payload || []
  }
})

const { actions, reducer } = slice

export default reducer

export const loadServiceProviders = () => {
  return async dispatch => {
    const providers = await serviceProviders.list()
    dispatch(actions.setServiceProviders(providers))
    return providers
  }
}
