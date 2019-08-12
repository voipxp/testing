import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderDeviceService', service)

service.$inject = ['$http', 'Route']
function service($http, Route) {
  var url = Route.api('/service-providers/devices')
  var service = { index, store, update, show, destroy }
  return service

  function index(serviceProviderId, q, params = {}) {
    return $http
      .get(url(), { params: { ...params, serviceProviderId, q } })
      .then(response => response.data)
  }

  function store(serviceProviderId, device) {
    return $http.post(url(), device).then(response => {
      return response.data
    })
  }

  function update(serviceProviderId, device) {
    return $http.put(url(), device).then(response => {
      return response.data
    })
  }

  function show(serviceProviderId, deviceName) {
    return $http
      .get(url(), { params: { serviceProviderId, deviceName } })
      .then(response => response.data)
  }

  function destroy(serviceProviderId, deviceName) {
    return $http
      .delete(url(), { params: { serviceProviderId, deviceName } })
      .then(response => {
        return response.data
      })
  }
}
