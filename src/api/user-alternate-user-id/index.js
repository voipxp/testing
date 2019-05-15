import { api } from '..'

export const show = userId => {
  return api.get('users/alternate-user-id', { params: { userId } })
}

export const update = params => {
  return api.put('users/alternate-user-id', params)
}

export default { show, update }
