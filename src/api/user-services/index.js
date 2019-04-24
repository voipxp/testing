import { api } from '..'

export const search = params => api.get('users/services/search', { params })

export default { search }
