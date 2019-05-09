import { createSlice } from 'redux-starter-kit'
import { useReduxState } from 'reactive-react-redux'
import { useAction } from './hooks'
import userApi from '@/api/users'

/*
  state.users = {
    [userId]: { ... }
  }
*/
const { actions, reducer } = createSlice({
  slice: 'user',
  initialState: {},
  reducers: {
    setUser: (state, { payload }) => {
      if (payload.userId) {
        state[payload.userId] = payload
      }
    }
  }
})

export { reducer as userReducer }

export const loadUser = userId => {
  return async dispatch => {
    const services = await userApi.show(userId)
    dispatch(actions.setUser(services))
    return services
  }
}

export const useUser = userId => {
  const state = useReduxState()
  return {
    user: state.user[userId],
    loadUser: useAction(loadUser)
  }
}
