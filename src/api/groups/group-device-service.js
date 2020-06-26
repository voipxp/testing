import { api } from '..'

const url = '/groups/devices'

export const index = (serviceProviderId, groupId, q, params = {}) => {
  return api.get(url, { params: { ...params, q, serviceProviderId, groupId } }).then(response => response)
}

export const store = (serviceProviderId, groupId, device) => {
  return api.post(url, device).then(response => response.data)
}

export const show = (serviceProviderId, groupId, deviceName) => {
  return api.get(url, { params: { serviceProviderId, groupId, deviceName } }).then(response => response)
}

export const update = (serviceProviderId, groupId, device) => {
  return api.put(url, device).then(response => response.data)
}

export const destroy = (serviceProviderId, groupId, deviceName) => {
  return api
    .delete(url, { params: { serviceProviderId, groupId, deviceName } })
    .then(response => response.data)
}

export const rebuild = (serviceProviderId, groupId, deviceName) => {
  return api
    .post(url + '/rebuild', { serviceProviderId, groupId, deviceName })
    .then(response => response.data)
}

export const reset = (serviceProviderId, groupId, deviceName) => {
  return api
    .post(url + '/reset', { serviceProviderId, groupId, deviceName })
    .then(response => response.data)
}

export const users = (serviceProviderId, groupId, deviceName) => {
  return api
    .post(url + '/users', { serviceProviderId, groupId, deviceName })
    .then(response => response.data)
}

export default { store, index, show, update, destroy, rebuild, reset, users }
