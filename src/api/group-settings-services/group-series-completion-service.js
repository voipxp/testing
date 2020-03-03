import { api } from '..'


export function show(serviceProviderId, groupId) {
  return api.get('groups/series-completion', { params: { serviceProviderId, groupId } })
}
 

export function update(params) { 
  return api.put('groups/series-completion', params)
}

export function store(object) { 
  return api.post('groups/series-completion', object)
}
 
export function destroy(serviceProviderId, groupId , name) {
  return api.delete('groups/series-completion', { params: { serviceProviderId, groupId , name } })
}

export function groupDetail(serviceProviderId, groupId, name) {
  return api.get('groups/series-completion', { params: { serviceProviderId, groupId, name } })
}

export function users(serviceProviderId, groupId){
	return api.get('groups/series-completion/users', { params: { serviceProviderId, groupId } })
}

export default { show, update, store, destroy, groupDetail, users}
