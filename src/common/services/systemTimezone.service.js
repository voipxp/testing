;(function() {
  angular
    .module('odin.common')
    .factory('SystemTimeZoneService', SystemTimeZoneService)

  function SystemTimeZoneService($http, CacheFactory, Route) {
    var url = Route.api('/system/timezones')
    var cache = CacheFactory('SystemTimeZoneService')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
