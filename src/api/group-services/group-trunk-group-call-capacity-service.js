import { api } from '..'

const url = '/groups/trunk-groups/call-capacity'

export const show = (serviceProviderId, groupId) => api.get( url , { params: { serviceProviderId: serviceProviderId, groupId: groupId }})

export const update = (object) => api.put( url , { params: object})

export default { show: show, update: update }
