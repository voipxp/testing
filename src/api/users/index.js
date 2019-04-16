import { api } from '..'

function search(params) {
  return api.get('users', { params })
}

export default { search }
