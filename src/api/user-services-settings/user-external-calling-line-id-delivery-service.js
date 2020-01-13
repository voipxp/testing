import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/external-calling-line-id-delivery', { params: { userId } })
}

export function update(params) {
  return api.put('/users/external-calling-line-id-delivery', params)
}
