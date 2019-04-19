import { api } from '..'

function search(params) {
  return api.get('users/services/search', { params })
}

export default { search }
