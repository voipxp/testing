import { api } from '..'

export function show(userId) {
  return api.get('/users/calling-name-delivery', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,  userId: <valueOfUserId> }

*/
export function update(params) {
  return api.put('/users/calling-name-delivery', params)
}

export default { show, update }