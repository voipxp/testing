import { api } from '..'

export const options = {
  recallTimerSeconds: {
    minimum: 6,
    maximum: 600
  }
}

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId: serviceProviderId, groupId: groupId } })
}

export function show(userId) {
  return api.get('/users/automatic-hold-retrieve', { params: { userId } })
}

export function update(params) {
  return api.put('/users/automatic-hold-retrieve', params)
}

export default { index, options, show, update }
