import { api } from '..'

const url = '/service-providers/trunk-groups/call-capacity'

export const show = (serviceProviderId) => api.get( url , { params: { serviceProviderId: serviceProviderId }})

export const update = (object) => api.put( url , { params: object})

export default { show: show, update: update }
