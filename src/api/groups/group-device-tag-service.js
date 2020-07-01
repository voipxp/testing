import { api } from '..'

const url = '/groups/devices/tags'

export const index = (serviceProviderId, groupId, deviceName) => {
    return api.get(url, { params: { serviceProviderId, groupId, deviceName } })
  }

export const store = (serviceProviderId, groupId, deviceName, tag) => {
    return api.post(url, { ...tag, serviceProviderId, groupId, deviceName })
      .then(response => response.data)
  }

export const update = (serviceProviderId, groupId, deviceName, tag) => {
    return api.put(url, { ...tag, serviceProviderId, groupId, deviceName })
  }

export const destroy = (serviceProviderId, groupId, deviceName, tagName) => {
    return api.delete(url, {
        params: { serviceProviderId, groupId, deviceName, tagName }
      })
  }


export default { index, store, update, destroy }