import angular from 'angular'

angular.module('odin.api').factory('GroupDeviceService', GroupDeviceService)

GroupDeviceService.$inject = ['$http', 'Route']
function GroupDeviceService($http, Route) {
  var service = { index, store, update, show, destroy, rebuild, reset }
  var url = Route.api('/groups/devices')
  return service

  function index(serviceProviderId, groupId, q, params = {}) {
    return $http
      .get(url(), { params: { ...params, q, serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, device) {
    return $http.post(url(), device).then(response => response.data)
  }

  function update(serviceProviderId, groupId, device) {
    return $http.put(url(), device).then(response => response.data)
  }

  function show(serviceProviderId, groupId, deviceName) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId, deviceName } })
      .then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, deviceName) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId, deviceName } })
      .then(response => response.data)
  }

  function rebuild(serviceProviderId, groupId, deviceName) {
    return $http
      .post(url('rebuild'), {
        params: { serviceProviderId, groupId, deviceName }
      })
      .then(response => response.data)
  }

  function reset(serviceProviderId, groupId, deviceName) {
    return $http
      .post(url('reset'), {
        params: { serviceProviderId, groupId, deviceName }
      })
      .then(response => response.data)
  }
}
