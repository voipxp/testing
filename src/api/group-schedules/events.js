import { api } from '..'
export default { index }

export function index(serviceProviderId, groupId, name, type) {
  return api.get('/groups/events', {
    params: { serviceProviderId, groupId, name, type }
  })
}
