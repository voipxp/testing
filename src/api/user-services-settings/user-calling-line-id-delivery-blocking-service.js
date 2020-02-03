import { api } from '..'

export function index(serviceProviderId, groupId) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show(userId) {
  return api.get('/users/calling-line-id-delivery-blocking', { params: { userId } })
}

export function update(params) {
  return api.put('/users/calling-line-id-delivery-blocking', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}

export default { index, show, update }
 
