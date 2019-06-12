import { api } from '..'
export default { index, show }

export function index(serviceProviderId, groupId) {
  return api.get('users/registration/bulk', {
    params: { serviceProviderId, groupId }
  })
}

export function show(userId) {
  return api.get('users/registration', { params: { userId } })
}
