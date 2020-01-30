import { api } from '..'

export function show(userId) {
  return api.get('/users/do-not-disturb', { params: { userId } })
}

export function update(params) {
  return api.put('/users/do-not-disturb', params)
}

export default { show, update }
