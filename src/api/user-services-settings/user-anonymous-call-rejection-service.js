import { api } from '..'
export default { show, update }

export function show(userId) {
  return api.get('/users/anonymous-call-rejection', { params: { userId } })
}

export function update(params) {
  return api.put('/users/anonymous-call-rejection', params)
}

export function bulk(params) {
  return api.put('bulk', params)
}
 

