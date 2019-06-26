import { api } from '..'
export default { index }

export function index(userId) {
  return api.get('/users/schedules', { params: { userId } })
}
