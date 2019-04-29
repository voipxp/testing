import { createSlice } from 'redux-starter-kit'
import userServicesApi from '@/api/user-services'

/*
  state.userViewableServices = {
    [userId]: {
      userServices
    }
  }
*/
const slice = createSlice({
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

const { actions, reducer } = slice

export default reducer

export const loadUserViewableServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.viewable(userId)
    dispatch(actions.setUserViewableServices(services))
    return services
  }
}
