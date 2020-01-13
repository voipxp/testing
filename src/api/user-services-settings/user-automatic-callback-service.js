import { api } from '..'
export default { show, update, index }

export function show(userId) {
  return api.get('/users/automatic-callback', { params: { userId } })
}

export function update(params) {
  return api.put('/users/automatic-callback', params)
}

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId: serviceProviderId, groupId: groupId } })
}