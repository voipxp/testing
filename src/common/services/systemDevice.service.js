;(function() {
  angular.module('odin.common').factory('SystemDeviceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemDeviceService')
    var url = Route.api('/system/devices')
    var service = { index, store, show, update, destroy }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }

    function store(device) {
      return $http.post(url(), device).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function update(device) {
      return $http.put(url(), device).then(res => {
        cache.removeAll()
        return res.data
      })
    }

    function show(deviceName) {
      return $http.get(url(), { params: { deviceName } }).then(res => res.data)
    }

    function destroy(deviceName) {
      return $http.delete(url(), { params: { deviceName } }).then(res => {
        cache.removeAll()
        return res.data
      })
    }
  }
})()
