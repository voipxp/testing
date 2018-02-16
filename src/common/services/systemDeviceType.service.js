;(function() {
  angular.module('odin.common').factory('SystemDeviceTypeService', Service)

  function Service($http, CacheFactory, Route) {
    var cache = CacheFactory('SystemDeviceTypeService')
    var service = { index: index }
    var url = Route.api('/system/devicetypes')
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
