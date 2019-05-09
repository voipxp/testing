import { createAction, createReducer } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import userServicesApi from '@/api/user-services'

const initialState = {}
const set = createAction('USER_VIEWABLE_SERVICES_LOAD')

export const userViewableServicesReducer = createReducer(initialState, {
  [set]: (state, { payload }) => {
    if (payload.userId) state[payload.userId] = payload
  }
})

export const loadUserViewableServices = userId => {
  return async dispatch => {
    const services = await userServicesApi.viewable(userId)
    dispatch(set(services))
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
