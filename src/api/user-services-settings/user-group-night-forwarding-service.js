import { api } from '..'

export function show(userId) {
  return api.get('/users/night-forwarding', { params: { userId } })
}

export function update(params) {
  return api.put('/users/night-forwarding', params)
}

export default { show, update }

