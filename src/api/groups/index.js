import { api } from '..'

function search(params) {
  return api.get('groups', { params })
}

export default { search }
