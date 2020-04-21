import { api } from '..'

const url = 'service-providers/enterprise-trunks'

export const list = (serviceProviderId) => api.get( url , { params: { serviceProviderId: serviceProviderId }})

export default { list }