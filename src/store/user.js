import { createSlice } from 'redux-starter-kit'
import userApi from '@/api/users'

/*
  state.users = {
    [userId]: { ... }
  }
*/
const slice = createSlice({
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

const { actions, reducer } = slice

export default reducer

export const loadUser = userId => {
  return async dispatch => {
    const services = await userApi.show(userId)
    dispatch(actions.setUser(services))
    return services
  }
}
