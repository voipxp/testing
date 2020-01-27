import { api } from '..'
export default { index, bulk, show, update }

export function index( serviceProviderId, groupId ) {
  return api.get('bulk', { params: { serviceProviderId: serviceProviderId, groupId: groupId } })
}

export function show(userId) {
  return api.get('/users/hoteling-host', { params: { userId } })
}

export function update(params) {
  return api.put('/users/hoteling-host', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}


 



