import { api } from '..'

export const search = params => api.get('system/dns/search', { params })

export default { search }
