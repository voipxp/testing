;(function() {
  angular
    .module('odin.common')
    .factory('GroupDeviceService', GroupDeviceService)

  function GroupDeviceService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupDeviceService')
    var service = {
      index: index,
      store: store,
      update: update,
      show: show,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, device) {
      var deviceId = (device && device.deviceName) || device
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'devices'
      )(deviceId)
    }

    function index(serviceProviderId, groupId, filter, params) {
      params = params || {}
      params.q = filter
      return $http
        .get(url(serviceProviderId, groupId), { cache: cache, params: params })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, device) {
      return $http
        .post(url(serviceProviderId, groupId), device)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function update(serviceProviderId, groupId, device) {
      return $http
        .put(url(serviceProviderId, groupId, device), device)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }

    function show(serviceProviderId, groupId, device) {
      return $http
        .get(url(serviceProviderId, groupId, device))
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, device) {
      return $http
        .delete(url(serviceProviderId, groupId, device))
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
