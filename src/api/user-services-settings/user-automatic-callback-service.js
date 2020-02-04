import { api } from '..'

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId: serviceProviderId, groupId: groupId } })
}

export function show(userId) {
  return api.get('/users/automatic-callback', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,userId: <valueOfUserId> }

*/

export function update(params) {
  return api.put('/users/automatic-callback', params)
}

export default { index, show, update }