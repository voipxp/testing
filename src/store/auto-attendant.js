import { createAction, createReducer } from 'redux-starter-kit'
import { useSelector } from 'react-redux'
import { useAction } from './hooks'
import autoAttendantApi from '@/api/auto-attendant'

const initialState = {
  profile: {},
  latestMenu: '',
  menu: [],
  digits: [],
  actions: [],
  options: [],
  schedule: [],
  announcement: [],
  announcements: [],
  schedules: [],
  domains: [],
  numbers: [],
  huntGroups: [],
  callCenters: [],
  operators: [],
  addAutoAttendant: [],
  updateAutoAttendant: []
  // addSubMenu: [],
  // updateSubMenu: []
}

const profile = createAction('AUTO_ATTENDANT_PROFILE')
const menu = createAction('AUTO_ATTENDANT_MENU')
const schedule = createAction('AUTO_ATTENDANT_SCHEDULE')
const announcement = createAction('AUTO_ATTENDANT_ANNOUNCEMENT')
const digits = createAction('AUTO_ATTENDANT_DIGITS')
const actions = createAction('AUTO_ATTENDANT_ACTIONS')
const options = createAction('AUTO_ATTENDANT_OPTIONS')
const announcements = createAction('AUTO_ATTENDANT_ANNOUNCEMENTS')
const schedules = createAction('AUTO_ATTENDANT_SCHEDULES')
const domains = createAction('AUTO_ATTENDANT_DOMAINS')
const numbers = createAction('AUTO_ATTENDANT_NUMBERS')
const huntGroups = createAction('AUTO_ATTENDANT_HUNT_GROUPS')
const callCenters = createAction('AUTO_ATTENDANT_CALL_CENTERS')
const operators = createAction('AUTO_ATTENDANT_OPERATORS')
const addAutoAttendant = createAction('AUTO_ATTENDANT_ADD_AUTO_ATTENDANT')
const updateAutoAttendant = createAction('AUTO_ATTENDANT_UPDATE_AUTO_ATTENDANT')
const clear = createAction('AUTO_ATTENDANT_CLEAR')
// const addSubMenu = createAction('AUTO_ATTENDANT_ADD_SUBMENU')
// const updateSubMenu = createAction('AUTO_ATTENDANT_UPDATE_SUBMENU')

export const autoAttendantReducer = createReducer(initialState, {
  [profile]: (state = initialState, { payload = {} }) => {
    return {
      ...state,
      profile: payload
    }
  },
  [menu]: (state, { payload = {} }) => {
    return {
      ...state,
      latestMenu: payload,
      menu: [...state.menu, payload]
    }
  },
  [schedule]: (state, { payload = {} }) => {
    return {
      ...state,
      schedule: [
        ...state.schedule,
        { menu: state.latestMenu, schedule: payload.schedule }
      ]
    }
  },
  [announcement]: (state, { payload = {} }) => {
    return {
      ...state,
      announcement: [
        ...state.announcement,
        { menu: state.latestMenu, announcement: payload.announcement }
      ]
    }
  },
  [digits]: (state, { payload = {} }) => {
    return {
      ...state,
      digits: [...state.digits, { menu: state.latestMenu, digit: payload }]
    }
  },
  [actions]: (state, { payload = {} }) => {
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
  [options]: (state, { payload = {} }) => {
    return {
      ...state,
      options: [
        ...state.options,
        {
          optionsValue: payload.optionsValue,
          option: payload.option,
          menu: state.latestMenu,
          digit: payload.digit,
          key: payload.key
        }
      ]
    }
  },
  [announcements]: (state, { payload = [] }) => {
    return {
      ...state,
      announcements: payload
    }
  },
  [schedules]: (state, { payload = [] }) => {
    return {
      ...state,
      schedules: payload
    }
  },
  [domains]: (state, { payload = [] }) => {
    return {
      ...state,
      domains: payload
    }
  },
  [numbers]: (state, { payload = [] }) => {
    return {
      ...state,
      numbers: payload
    }
  },
  [huntGroups]: (state, { payload = [] }) => {
    return {
      ...state,
      huntGroups: payload
    }
  },
  [callCenters]: (state, { payload = [] }) => {
    return {
      ...state,
      callCenters: payload
    }
  },
  [operators]: (state, { payload = [] }) => {
    return {
      ...state,
      operators: payload
    }
  },
  [addAutoAttendant]: (state, { payload = [] }) => {
    return {
      ...state,
      addAutoAttendant: payload
    }
  },
  [updateAutoAttendant]: (state, { payload = [] }) => {
    return {
      ...state,
      updateAutoAttendant: payload
    }
  },
  [clear]: state => {
    return (state = initialState)
  }
  /* [addSubMenu]: (state, { payload = [] }) => {
    return {
      ...state,
      addSubMenu: payload
    }
  },
  [updateSubMenu]: (state, { payload = [] }) => {
    return {
      ...state,
      updateSubMenu: payload
    }
  }*/
})

export const saveUserProfile = payload => async dispatch => {
  dispatch(profile(payload))
}

export const saveMenu = payload => async dispatch => {
  dispatch(menu(payload))
}

export const saveAnnouncementSchedule = payload => async dispatch => {
  dispatch(schedule(payload))
  dispatch(announcement(payload))
}

export const saveDigits = payload => async dispatch => {
  dispatch(digits(payload))
}

export const saveAction = payload => async dispatch => {
  dispatch(actions(payload))
}

export const saveOption = payload => async dispatch => {
  dispatch(options(payload))
}

export const getAnnouncements = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.announcements(
      groupId,
      serviceProviderId
    )
    dispatch(announcements(data))
    return data
  }
}

export const getSchedules = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.schedules(groupId, serviceProviderId)
    dispatch(schedules(data))
    return data
  }
}

export const getDomains = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.domains(groupId, serviceProviderId)
    dispatch(domains(data))
    return data
  }
}

export const getNumbers = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.numbers(groupId, serviceProviderId)
    dispatch(numbers(data))
    return data
  }
}

export const getHuntGroups = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.huntGroups(groupId, serviceProviderId)
    dispatch(huntGroups(data))
    return data
  }
}

export const getCallCenters = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.callCenters(groupId, serviceProviderId)
    dispatch(callCenters(data))
    return data
  }
}

export const getOperators = (groupId, serviceProviderId) => {
  return async dispatch => {
    const data = await autoAttendantApi.operators(groupId, serviceProviderId)
    dispatch(operators(data))
    return data
  }
}

export const postAutoAttendant = (groupId, serviceProviderId, params) => {
  return async dispatch => {
    const data = await autoAttendantApi.addAutoAttendant(
      groupId,
      serviceProviderId,
      params
    )
    dispatch(addAutoAttendant(data))
    return data
  }
}

export const editAutoAttendant = (groupId, serviceProviderId, params) => {
  return async dispatch => {
    const data = await autoAttendantApi.updateAutoAttendant(
      groupId,
      serviceProviderId,
      params
    )
    dispatch(updateAutoAttendant(data))
    return data
  }
}

export const clearAutoAttendant = () => async dispatch => {
  dispatch(clear())
}

/* export const postSubMenu = params => {
  return async dispatch => {
    const data = await autoAttendantApi.addSubMenu(params)
    dispatch(addSubMenu(data))
    return data
  }
}

export const editSubMenu = params => {
  return async dispatch => {
    const data = await autoAttendantApi.updateSubMenu(params)
    dispatch(updateSubMenu(data))
    return data
  }
}*/

export const useAutoAttendant = () => {
  return {
    autoAttendant: useSelector(state => state.autoAttendant),
    saveUserProfile: useAction(saveUserProfile),
    saveMenu: useAction(saveMenu),
    saveAnnouncementSchedule: useAction(saveAnnouncementSchedule),
    saveDigits: useAction(saveDigits),
    saveAction: useAction(saveAction),
    saveOption: useAction(saveOption),
    getAnnouncements: useAction(getAnnouncements),
    getSchedules: useAction(getSchedules),
    getDomains: useAction(getDomains),
    getNumbers: useAction(getNumbers),
    getHuntGroups: useAction(getHuntGroups),
    getCallCenters: useAction(getCallCenters),
    getOperators: useAction(getOperators),
    postAutoAttendant: useAction(postAutoAttendant),
    editAutoAttendant: useAction(editAutoAttendant),
    clearAutoAttendant: useAction(clearAutoAttendant)
    // postSubMenu: useAction(postSubMenu),
    // editSubMenu: useAction(editSubMenu)
  }
}
