import { api } from '..'

function search(params) {
  return api.get('system/dns/search', { params })
}

export default { search }
