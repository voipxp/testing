import { api } from '..'

  const url = '/groups/device-types'

  export const index = (serviceProviderId, groupId) => {
    return api.get(url, { params: { serviceProviderId, groupId } })
  }

  export const show = (serviceProviderId, groupId, deviceType) => {
    return api.get(url, { params: { serviceProviderId, groupId, deviceType } })
  }

  export const rebuild = (serviceProviderId, groupId, deviceType) => {
    return api.post(url + '/rebuild', { serviceProviderId, groupId, deviceType })
  }

  export const reset = (serviceProviderId, groupId, deviceType) => {
    return api.post(url + '/reset', { serviceProviderId, groupId, deviceType })
  }

export default { index, show, rebuild, reset }