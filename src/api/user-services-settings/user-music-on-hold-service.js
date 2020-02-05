import { api } from '..'

export function show(userId) {
  return api.get('/users/music-on-hold', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false, userId: <valueOfUserId>, }
*/

export function update(params) {
  return api.put('/users/music-on-hold', params)
}

export default { show, update }


