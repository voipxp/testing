;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderDeviceService', ServiceProviderDeviceService)

  function ServiceProviderDeviceService($http, CacheFactory, Route) {
    var cache = CacheFactory('ServiceProviderDeviceService')
    var url = Route.api2('/service-providers/devices')
    var service = { index, store, update, show, destroy }
    return service

    function index(serviceProviderId, q, params = {}) {
      return $http
        .get(url(), { cache, params: { ...params, serviceProviderId, q } })
        .then(res => res.data)
    }

    function store(serviceProviderId, device) {
      return $http.post(url(), device).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function update(serviceProviderId, device) {
      return $http.put(url(), device).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function show(serviceProviderId, deviceName) {
      return $http
        .get(url(), { params: { serviceProviderId, deviceName } })
        .then(res => res.data)
    }

    function destroy(serviceProviderId, deviceName) {
      return $http
        .delete(url(), { params: { serviceProviderId, deviceName } })
        .then(res => {
          cache.removeAll()
          return res.data
        })
    }
  }
})()
