import { api } from '..'

export const available = (groupId, serviceProviderId) => {
	return api.get('groups/services/available', { params: {groupId, serviceProviderId} })
}

export default { available }