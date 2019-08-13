import { api } from '..'

export function list(userId) {
  return api.get('/resellers')
}

export function update(params) {
  return api.put('/resellers', params)
}

export function create(params) {
  return api.post('/resellers', params)
}

export function destroy(resellerId) {
  return api.delete('/resellers', { params: { resellerId } })
}

export default { list, update, create, destroy }
