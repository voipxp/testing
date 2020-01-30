import { api } from '..'
export default { list, show, create, json }

export function list(limit = 0, params = {}) {
  const { includeChildren = false, includeData = false, ...rest } = params
  return api.get('/exports', {
    params: { limit, includeChildren, includeData, ...rest }
  })
}

export function json(parentId) {
  api.setResponseType = 'stream'
  return api.get(`/exports/details/json`, {
    params: { parentId }
  })
}

export function create(params = {}) {
  return api.post('/exports', params)
}

export function show(id, params = {}) {
  const { includeChildren = true, includeData = false, ...rest } = params
  return api.get(`/exports`, {
    params: { id, includeChildren, includeData, ...rest }
  })
}

export function types() {
  return api.get(`/exports/types`)
}
