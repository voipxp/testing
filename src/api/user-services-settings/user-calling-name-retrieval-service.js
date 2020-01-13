import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/calling-name-retrieval', { params: { userId } })
}

export function update(params) {
  return api.put('/users/calling-name-retrieval', params)
}
