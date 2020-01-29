import { api } from '..'
 
export function load( serviceProviderId, groupId ) {
	return api.get('/groups/dns/details', { params: { serviceProviderId, groupId } })
} 

export default { load }
