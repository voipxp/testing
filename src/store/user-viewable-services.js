import { createSlice } from 'redux-starter-kit'
import userServicesApi from '@/api/user-services'

/*
  state.userViewableServices = {
    [userId]: {
      userServices
    }
  }
*/
const { actions, reducer } = createSlice({
  slice: 'userViewableServices',
  initialState: {},
  reducers: {
    setUserViewableServices: (state, { payload }) => {
      if (payload.userId) {
        state[payload.userId] = payload
      }
    }
  }
})

export { reducer as userViewableServicesReducer }

export const loadUserViewableServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.viewable(userId)
    dispatch(actions.setUserViewableServices(services))
    return services
  }
}
