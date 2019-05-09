import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
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
const { actions, reducer } = createSlice({
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

export { reducer as userServicesReducer }

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

export const useUserServices = userId => {
  const state = useReduxState()
  return {
    userServices: state.userServices[userId],
    loadUserServices: useAction(loadUserServices),
    updateUserServices: useAction(updateUserServices)
  }
}
