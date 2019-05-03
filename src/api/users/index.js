import { api } from '..'

export const search = params => api.get('users', { params })

export const show = userId => api.get('users', { params: { userId } })

export default { search, show }
