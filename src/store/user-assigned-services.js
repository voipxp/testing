import { createSlice } from 'redux-starter-kit'
import userServicesApi from '@/api/user-services'

/*
  state.userAssignedServices = {
    [userId]: {
      userServices,
      groupServices
    }
  }
*/
const slice = createSlice({
  slice: 'userAssignedServices',
  initialState: {},
  reducers: {
    setUserAssignedServices: (state, { payload }) => {
      if (payload.userId) {
        state[payload.userId] = payload
      }
    }
  }
})

const { actions, reducer } = slice

export default reducer

export const loadUserAssignedServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.assigned(userId)
    dispatch(actions.setUserAssignedServices(services))
    return services
  }
}
