import { api } from '..'

export default { list, show }

export function list() {
  return api.get('/settings/')
}

export function show(key) {
  return api.get(`/settings/` + key)
}
