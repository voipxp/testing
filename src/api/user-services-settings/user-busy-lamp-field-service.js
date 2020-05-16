import { api } from '..'
 
const url  = '/users/busy-lamp-field' 
export function show(userId) {
  return api.get( url, { params: { userId } })
}


export function users(userId) {
  return api.get('users', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,recallTimerSeconds: 20, userId: <valueOfUserId>, }

*/

export function update(userId, object) { 
  return api.put('users/busy-lamp-field', object)
}

export default { show, users, update }

