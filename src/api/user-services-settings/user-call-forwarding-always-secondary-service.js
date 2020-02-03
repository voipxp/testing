import { api } from '..'

export const options = {
	forwardToPhoneNumber:{
		minimum:1,
		maximum:161
	}
}

export function index(serviceProviderId, groupId) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function bulk(params) {
  return api.put('bulk', params)
}

export function show(userId) {
  return api.get('/users/call-forwarding-always-secondary', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-forwarding-always-secondary', params)
}



export default { index, bulk, show, update, options }


