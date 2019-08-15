import { api } from '..'
export default { list, show, update, create, destroy }

export function list(resellerId) {
  console.log('resellerId', resellerId)
  return api.get('/reseller/admins', {
    params: { resellerId }
  })
}

export function show(userId) {
  return api.get('/reseller/admins', { params: { userId } })
}

export function update(params) {
  return api.put('/reseller/admins', params)
}

export function create(params) {
  return api.post('/reseller/admins', params)
}

export function destroy(userId) {
  return api.delete('/reseller/admins', { params: { userId } })
}
