;(function() {
  angular.module('odin.common').factory('SystemDeviceService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemDeviceService')
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    return service

    function url(device) {
      var deviceId = (device && device.deviceName) || device
      return Route.api('/system/devices')(deviceId)
    }

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function store(device) {
      return $http.post(url(), device).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function update(device) {
      return $http.put(url(device), device).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(device) {
      return $http.get(url(device)).then(function(response) {
        return response.data
      })
    }

    function destroy(device) {
      return $http.delete(url(device)).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
