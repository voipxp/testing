import { api } from '..'

const url = 'groups/trunk-groups'

export const list = (serviceProviderId, groupId) => api.get( url , { params: { serviceProviderId: serviceProviderId, groupId: groupId }})

export default { list }