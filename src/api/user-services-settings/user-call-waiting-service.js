import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/call-waiting', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-waiting', params)
}
