import { api } from '..'

export function show(userId) {
  return api.get('/users/call-waiting', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-waiting', params)
}

export default { show, update }
