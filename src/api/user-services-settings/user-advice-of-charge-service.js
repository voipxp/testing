import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/advice-of-charge', { params: { userId } })
}

export function update(params) {
  return api.put('/users/advice-of-charge', params)
}
