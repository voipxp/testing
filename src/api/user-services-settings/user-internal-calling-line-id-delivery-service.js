import { api } from '..'

const url = '/users/internal-calling-line-id-delivery'

export function show(userId) {
  return api.get(url, { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false, userId: <valueOfUserId> }
*/

export function update(params) {
  return api.put(url, params)
}

export default { show, update }

