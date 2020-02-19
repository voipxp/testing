import { api } from '..'


export function show(serviceProviderId, groupId) {
  return api.get('groups/series-completion', { params: { serviceProviderId, groupId } })
}

export function users(serviceProviderId, groupId, name ) {
  return api.get('groups/series-completion', { params: { serviceProviderId, groupId, name } })
}

/**
The response json gor get and param for update is a json of the format:
{isActive:true/false,disableCallingLineIdDelivery:true/false, userId: <valueOfUserId> }

*/

export function update(params) {
  return api.put('groups/series-completion', params)
}

export function store(object) { 
  return api.post('groups/series-completion', object)
}

export function destroy(object) {
  return api.put('groups/series-completion', object)
}

export default { show, update, store,destroy }
