;(function() {
  angular
    .module('odin.common')
    .factory('SystemDomainService', SystemDomainService)

  function SystemDomainService($http, CacheFactory, Route) {
    var url = Route.api('/system/domains')
    var cache = CacheFactory('SystemDomainService')
    var service = { index: index }
    return service

    function index() {
      return $http.get(url(), { cache: cache }).then(function(response) {
        return response.data
      })
    }
  }
})()
