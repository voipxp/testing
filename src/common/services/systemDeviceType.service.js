;(function() {
  angular.module('odin.common').factory('SystemDeviceTypeService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemDeviceTypeService')
    var service = { index }
    var url = Route.api2('/system/device-types')
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
