;(function() {
  angular
    .module('odin.common')
    .factory('SystemRoutingProfileService', SystemRoutingProfileService)

  function SystemRoutingProfileService($http, CacheFactory, Route) {
    var url = Route.api2('/system/routing-profile')
    var cache = CacheFactory('SystemRoutingProfileService')
    var service = { index }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
