import { api } from '..'
 
const url  = '/users/busy-lamp-field' 
export function show(userId) {
  return api.get( url, { params: { userId } })
}


export function users(userId) {
  return api.get('/users/busy-lamp-field/users', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{listURI:busyFieldLamp@odinweb.com,enableCallParkNotification: true/false,users:[], userId: <valueOfUserId>, }

*/

export function update(params) { 
  return api.put('users/busy-lamp-field', params)
}

export default { show, users, update }

