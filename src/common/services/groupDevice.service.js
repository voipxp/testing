;(function() {
  angular
    .module('odin.common')
    .factory('GroupDeviceService', GroupDeviceService)

  function GroupDeviceService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupDeviceService')
    var service = { index, store, update, show, destroy, rebuild, reset }
    var url = Route.api2('/groups/devices')
    return service

    function index(serviceProviderId, groupId, q, params = {}) {
      return $http
        .get(url(), {
          cache,
          params: { ...params, q, serviceProviderId, groupId }
        })
        .then(res => res.data)
    }

    function store(serviceProviderId, groupId, device) {
      return $http.post(url(), device).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function update(serviceProviderId, groupId, device) {
      return $http.put(url(), device).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function show(serviceProviderId, groupId, deviceName) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId, deviceName } })
        .then(res => res.data)
    }

    function destroy(serviceProviderId, groupId, deviceName) {
      return $http
        .delete(url(), { params: { serviceProviderId, groupId, deviceName } })
        .then(res => {
          cache.removeAll()
          return res.data
        })
    }

    function rebuild(serviceProviderId, groupId, deviceName) {
      return $http
        .post(url('rebuild'), {
          params: { serviceProviderId, groupId, deviceName }
        })
        .then(res => res.data)
    }

    function reset(serviceProviderId, groupId, deviceName) {
      return $http
        .post(url('reset'), {
          params: { serviceProviderId, groupId, deviceName }
        })
        .then(res => res.data)
    }
  }
})()
