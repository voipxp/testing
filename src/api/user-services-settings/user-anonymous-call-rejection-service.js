import { api } from '..'
export default { index, show, update }

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId: serviceProviderId, groupId: groupId } })
}

export function show(userId) {
  return api.get('/users/anonymous-call-rejection', { params: { userId } })
}

export function update(params) {
  return api.put('/users/anonymous-call-rejection', params)
}

 

