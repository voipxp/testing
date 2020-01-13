import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/call-transfer', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-transfer', params)
}
