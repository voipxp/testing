import { api } from '..'
export default { show, update }

export function show(serviceProviderId, groupId) {
  return api.get('groups/communication-barring', {
    params: { serviceProviderId, groupId }
  })
}

export function update(serviceProviderId, groupId, params) {
  return api.put('groups/communication-barring', {
    serviceProviderId,
    groupId,
    ...params
  })
}
