import { api } from '..'

export const options = {
	forwardToPhoneNumber:{
		minimum:1,
		maximum:30
	}
}

export function index(serviceProviderId, groupId) {
  return api.get('bulk', { params: { serviceProviderId, groupId } })
}

export function show(userId) {
  return api.get('/users/call-forwarding-busy', { params: { userId } })
}

export function update(params) {
  return api.put('/users/call-forwarding-busy', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}

export default { index, show, update, bulk, options }


