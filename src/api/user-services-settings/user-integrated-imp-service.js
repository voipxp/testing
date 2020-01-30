import { api } from '..'

export function show(userId) {
  return api.get('/users/integrated-imp', { params: { userId } })
}

export function update(params) {
  return api.put('/users/integrated-imp', params)
}


export default { show, update }