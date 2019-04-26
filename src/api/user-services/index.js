import { api } from '..'

export const search = params => {
  return api.get('users/services/search', { params })
}

export const show = userId => {
  return api.get('users/services', { params: { userId } })
}

export const assigned = userId => {
  return api.get('users/services/assigned', { params: { userId } })
}

export const viewable = userId => {
  return api.get('users/services/viewable', { params: { userId } })
}

export const update = services => {
  return api.put('users/services', services)
}

export default { search, show, assigned, viewable, update }
