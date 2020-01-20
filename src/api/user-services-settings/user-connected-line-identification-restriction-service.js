import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/connected-line-identification-restriction', { params: { userId } })
}

export function update(params) {
  return api.put('/users/connected-line-identification-restriction', params)
}

