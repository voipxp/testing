import { api } from '..'

export const search = params => api.get('groups', { params })

export default { search }
