import { api } from '..'

export function index(serviceProviderId, groupId) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show(userId) {
  return api.get('/users/calling-line-id-delivery-blocking', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{ isActive:true/false userId: <valueOfUserId> }

*/
export function update(params) {
  return api.put('/users/calling-line-id-delivery-blocking', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}

export default { index, show, update }
 
