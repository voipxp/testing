import { api } from '..'
export default { show, update }

export function show(serviceProviderId, groupId) {
  return api.get('groups/extensions', {
    params: { serviceProviderId, groupId }
  })
}

export function update(serviceProviderId, groupId, data) {
  const params = { serviceProviderId, groupId, ...data }
  return api.put('groups/extensions', params)
}
