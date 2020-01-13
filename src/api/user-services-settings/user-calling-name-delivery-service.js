import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/calling-name-delivery', { params: { userId } })
}

export function update(params) {
  return api.put('/users/calling-name-delivery', params)
}