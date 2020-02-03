import { api } from '..'

export function show(userId) {
  return api.get('/users/calling-number-delivery', { params: { userId } })
}

export function update(params) {
  return api.put('/users/calling-number-delivery', params)
}

export default { show, update }
