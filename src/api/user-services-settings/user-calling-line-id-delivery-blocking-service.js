import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/calling-line-id-delivery-blocking', { params: { userId } })
}

export function update(params) {
  return api.put('/users/calling-line-id-delivery-blocking', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}
 
