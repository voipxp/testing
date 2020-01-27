import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/outlook-integration', { params: { userId } })
}

export function update(params) {
  return api.put('/users/outlook-integration', params)
}



