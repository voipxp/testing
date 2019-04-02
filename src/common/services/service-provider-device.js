import angular from 'angular'

angular.module('odin.common').factory('ServiceProviderDeviceService', service)

service.$inject = ['$http', 'CacheFactory', 'Route']
function service($http, CacheFactory, Route) {
  var cache = CacheFactory('ServiceProviderDeviceService')
  var url = Route.api('/service-providers/devices')
  var service = { index, store, update, show, destroy }
  return service

  function index(serviceProviderId, q, params = {}) {
    return $http
      .get(url(), { cache, params: { ...params, serviceProviderId, q } })
      .then(response => response.data)
  }

  function store(serviceProviderId, device) {
    return $http.post(url(), device).then(response => {
      cache.removeAll()
      return response.data
    })
  }

  function update(serviceProviderId, device) {
    return $http.put(url(), device).then(response => {
      cache.removeAll()
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
        cache.removeAll()
        return response.data
      })
  }
}
