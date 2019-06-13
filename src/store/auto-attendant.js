import { createSlice } from 'redux-starter-kit'

const slice = createSlice({
  slice: 'autoAttendantServices',
  initialState: {
    profile: {},
    latestMenu: '',
    menu: [],
    digits: [],
    actions: [],
    options: []
  },
  reducers: {
    saveUserProfile: (state, { payload }) => {
      return { ...state, profile: payload }
    },
    saveMenu: (state, { payload }) => {
      return {
        ...state,
        latestMenu: payload,
        menu: [...state.menu, payload]
      }
    },
    saveDigits: (state, { payload }) => {
      return {
        ...state,
        digits: [...state.digits, { menu: state.latestMenu, digit: payload }]
      }
    },
    saveAction: (state, { payload }) => {
      return {
        ...state,
        actions: [
          ...state.actions,
          {
            action: payload.action,
            menu: state.latestMenu,
            digit: payload.digit
          }
        ]
      }
    },
    saveOption: (state, { payload }) => {
      return {
        ...state,
        options: [
          ...state.options,
          {
            option: payload.option,
            menu: state.latestMenu,
            digit: payload.digit
          }
        ]
      }
    }
  }
})

const { actions, reducer } = slice

export default reducer

export const saveUserProfile = data => {
  return async dispatch => {
    dispatch(actions.saveUserProfile(data))
    return data
  }
}

export const saveMenu = data => {
  return async dispatch => {
    dispatch(actions.saveMenu(data))
    return data
  }
}

export const saveDigits = data => {
  return async dispatch => {
    dispatch(actions.saveDigits(data))
    return data
  }
}

export const saveAction = data => {
  return async dispatch => {
    dispatch(actions.saveAction(data))
    return data
  }
}

export const saveOption = data => {
  return async dispatch => {
    dispatch(actions.saveOption(data))
    return data
  }
}
