import { api } from '..'

const url = '/service-providers/passcode-rules'

export const show = (serviceProviderId) => {
  return api.get(url, {
    params: { serviceProviderId, groupId }
  })
}

export const update = (serviceProviderId, object) => {
	return api.put(url, object)
}

export default {
	show,
	update
}