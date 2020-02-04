import { api } from '..'

export const options = {
  recallTimerSeconds: {
    minimum: 6,
    maximum: 600
  }
}

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show(userId) {
  return api.get('/users/automatic-hold-retrieve', { params: { userId } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,recallTimerSeconds: 20, userId: <valueOfUserId>, }

*/

export function update(params) {
  return api.put('/users/automatic-hold-retrieve', params)
}

export default { index, options, show, update }
