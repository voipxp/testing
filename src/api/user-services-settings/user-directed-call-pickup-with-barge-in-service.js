import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/directed-call-pickup-with-barge-in', { params: { userId } })
}

export function update(params) {
  return api.put('/users/directed-call-pickup-with-barge-in', params)
}
