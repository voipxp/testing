import { api } from '..'

const url = '/groups/devices'

export function index(serviceProviderId, groupId, q, params = {}) {
    return $http
      .get(url(), { params: { ...params, q, serviceProviderId, groupId } })
      .then(response => response.data)
  }
  
  function store(serviceProviderId, groupId, device) {
    return api.post(url, device).then(response => response.data)
  }
  
export default { store }
