import { createSlice } from 'redux-starter-kit'
import { loadUserAssignedServices } from './user-assigned-services'
import userServicesApi from '@/api/user-services'

/*
  state.userServices = {
    [userId]: {
      userServices,
      servicePackServices
    }
  }
*/
const slice = createSlice({
  slice: 'userServices',
  initialState: {},
  reducers: {
    setUserServices: (state, { payload }) => {
      if (payload.userId) {
        state[payload.userId] = payload
      }
    }
  }
})

const { actions, reducer } = slice

export default reducer

export const loadUserServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.show(userId)
    dispatch(actions.setUserServices(services))
    return services
  }
}

export const updateUserServices = services => {
  return async dispatch => {
    const data = await userServicesApi.update(services)
    dispatch(actions.setUserServices(data))
    dispatch(loadUserAssignedServices(services.userId))
    return data
  }
}
