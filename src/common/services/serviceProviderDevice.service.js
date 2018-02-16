;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderDeviceService', ServiceProviderDeviceService)

  function ServiceProviderDeviceService($http, CacheFactory, Route) {
    var cache = CacheFactory('ServiceProviderDeviceService')
    var service = {
      index: index,
      store: store,
      update: update,
      show: show,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, device) {
      var deviceId = (device && device.deviceName) || device
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'devices',
        deviceId
      )()
    }

    function index(serviceProviderId, filter, params) {
      params = params || {}
      params.q = filter
      return $http
        .get(url(serviceProviderId), { cache: cache, params: params })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, device) {
      return $http
        .post(url(serviceProviderId), device)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function update(serviceProviderId, device) {
      return $http
        .put(url(serviceProviderId, device), device)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function show(serviceProviderId, device) {
      return $http.get(url(serviceProviderId, device)).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, device) {
      return $http
        .delete(url(serviceProviderId, device))
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
