import { api } from '..'
export default { show, update, bulk }

export function show(userId) {
  return api.get('/users/call-forwarding-always', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-forwarding-always', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}
