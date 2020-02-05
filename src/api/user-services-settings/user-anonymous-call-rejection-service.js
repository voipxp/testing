import { api } from '..'

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show(userId) {
  return api.get('/users/anonymous-call-rejection', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,userId: <valueOfUserId> }

*/
export function update(params) {
  return api.put('/users/anonymous-call-rejection', params)
}

export default { index, show, update }

 

