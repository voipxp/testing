import { api } from '..'

export function show(userId) {
  return api.get('/users/internal-calling-line-id-delivery', { params: { userId } })
}

export function update(params) {
  return api.put('/users/internal-calling-line-id-delivery', params)
}

export default { show, update }

