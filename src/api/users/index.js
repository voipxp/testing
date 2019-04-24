import { api } from '..'

export const search = params => api.get('users', { params })

export default { search }
