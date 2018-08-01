;(function() {
  angular
    .module('odin.common')
    .factory('SystemRoutingProfileService', SystemRoutingProfileService)

  function SystemRoutingProfileService($http, CacheFactory, Route) {
    var url = Route.api('/system/routingprofile')
    var cache = CacheFactory('SystemRoutingProfileService')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
