import { api } from '..'
 
export function load( serviceProviderId ) {
	return api.get('service-providers/domains', { params: { serviceProviderId } })
} 

export default { load }
