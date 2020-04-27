import { api } from '..'

const url = 'groups/services'
export const available = (groupId, serviceProviderId) => {
	return api.get(url + '/available', { params: {groupId, serviceProviderId} })
}

export const show = (groupId, serviceProviderId) => {
	return api.get(url, { params: {groupId, serviceProviderId} })
}
export default { available, show }
