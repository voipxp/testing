import { api } from '..'

export function load( serviceProviderId, groupId ) {
	return api.get('/users/shared-call-appearance/bulk', { params: { serviceProviderId, groupId } })
} 

export default { load }
