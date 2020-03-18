import { api } from '..'
  

export function show( serviceProviderId, groupId ) {
	return api.get('/groups/network-class-of-services', { 
		params: {
		serviceProviderId: serviceProviderId,
		groupId: groupId
		} 
	})
}

export function update( serviceProviderId, groupId, services ) {
  return api.put('/groups/network-class-of-services', {
	serviceProviderId: serviceProviderId,
	groupId: groupId,
	services: services
  })
}


export function select( serviceProviderId, groupId, name ) {
  return api.post('/groups/network-class-of-services', {
	serviceProviderId: serviceProviderId,
	groupId: groupId,
	name: name
  })
}

export default { show: show, select: select, update: update }
 

