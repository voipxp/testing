import { api } from '..'

const url = '/groups/passcode-rules'

export const show = (serviceProviderId, groupId) => {
  return api.get(url, {
    params: { serviceProviderId, groupId }
  })	
}

export const update = (serviceProviderId, groupId, object) => {
	return api.put(url, object)
}

export default {
	show,
	update
}
