import { api } from '..'

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,forwardToPhoneNumber: 20, userId: <valueOfUserId> }

*/

export const options = {
  forwardToPhoneNumber: {
    minimum: 1,
    maximum: 30
  }
}

export function index(serviceProviderId, groupId) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show(userId) {
  return api.get('/users/call-forwarding-not-reachable', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,forwardToPhoneNumber :20,  userId: <valueOfUserId> }

*/

export function update(params) {
  return api.put('/users/call-forwarding-not-reachable', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}

export default { index, show, update, bulk, options }



