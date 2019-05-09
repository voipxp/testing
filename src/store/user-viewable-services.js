import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
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

export const useUserViewableServices = userId => {
  const state = useReduxState()
  return {
    userViewableServices: state.userViewableServices[userId],
    loadUserViewableServices: useAction(loadUserViewableServices)
  }
}
