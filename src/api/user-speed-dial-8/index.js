import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('users/speed-dial-8', { params: { userId } })
}

export function update(params) {
  return api.put('users/speed-dial-8', params)
}
