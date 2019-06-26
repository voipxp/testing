import { api } from '..'
export default { index }

export function index(userId, name, type) {
  return api.get('/users/events', { params: { userId, name, type } })
}
