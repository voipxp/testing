import { api } from '..'

export const list = () => api.get('service-providers')

export default { list }
