import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/barge-in-exempt', { params: { userId } })
}

export function update(params) {
  return api.put('/users/barge-in-exempt', params)
}


