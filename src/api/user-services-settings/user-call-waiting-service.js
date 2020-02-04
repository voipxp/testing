import { api } from '..'

export function show(userId) {
  return api.get('/users/call-waiting', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,disableCallingLineIdDelivery:true/false, userId: <valueOfUserId> }

*/

export function update(params) {
  return api.put('/users/call-waiting', params)
}

export default { show, update }
