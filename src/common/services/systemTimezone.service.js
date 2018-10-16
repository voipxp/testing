;(function() {
  angular.module('odin.common').factory('SystemTimeZoneService', Service)

  function Service($http, CacheFactory, Route) {
    var url = Route.api2('/system/time-zones')
    var cache = CacheFactory('SystemTimeZoneService')
    var service = { index }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
