import { api } from '..'

export function show(userId) {
  return api.get('/users/barge-in-exempt', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,userId: <valueOfUserId> }

*/
export function update(params) {
  return api.put('/users/barge-in-exempt', params)
}

export default { show, update }


