import { api } from '..'

export function list() {
  return api.get('/resellers')
}

export async function show(resellerId) {
  return api.get('/resellers', { params: { resellerId } })
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

export default { list, show, update, create, destroy }
