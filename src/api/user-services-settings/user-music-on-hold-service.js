import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/music-on-hold', { params: { userId } })
}

export function update(params) {
  return api.put('/users/music-on-hold', params)
}


