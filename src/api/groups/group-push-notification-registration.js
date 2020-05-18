import { api } from '..'

export function load( serviceProviderId, groupId ) {
	return api.get('/users/push-notification-registration/bulk', { params: { serviceProviderId, groupId } })
} 

export default { load }
