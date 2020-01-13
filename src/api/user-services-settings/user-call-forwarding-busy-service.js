import { api } from '..'
export default { show, update, bulk }

export function show(userId) {
  return api.get('/users/call-forwarding-busy', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-forwarding-busy', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}


