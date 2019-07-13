import { api } from '..'
export default { index, show, update, bulk }

export function index(serviceProviderId, groupId) {
  return api.get('users/speed-dial-8/bulk', {
    params: { serviceProviderId, groupId }
  })
}

export function show(userId) {
  return api.get('users/speed-dial-8', { params: { userId } })
}

export function update(params) {
  return api.put('users/speed-dial-8', params)
}

export function bulk(params) {
  return api.put('users/speed-dial-8/bulk', params)
}
