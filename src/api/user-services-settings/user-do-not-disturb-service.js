import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/do-not-disturb', { params: { userId } })
}

export function update(params) {
  return api.put('/users/do-not-disturb', params)
}
