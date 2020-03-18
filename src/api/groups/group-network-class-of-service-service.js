import { api } from '..'
  

export function show( serviceProviderId, groupId ) {
  return api.get('/groups/network-class-of-services', { params: { serviceProviderId, groupId } })
}

export function update(params) {
  return api.put('/groups/network-class-of-services', params)
}


export function select( params ) {
  return api.put('/groups/network-class-of-services', params)
}

export default { show, update, select  }
 

