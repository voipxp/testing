import { api } from '..'

const url = '/groups/devices'

export const index = (serviceProviderId, groupId, q, params = {}) => {
    return api.get(url, { params: { ...params, q, serviceProviderId, groupId } }).then(response => response)	
  }
  
export const store = (serviceProviderId, groupId, device) => {
    return api.post(url, device).then(response => response.data)
  }
  
export default { store, index }
