;(function() {
  angular
    .module('odin.common')
    .factory('SystemDomainService', SystemDomainService)

  function SystemDomainService($http, CacheFactory, Route) {
    var url = Route.api2('/system/domains')
    var cache = CacheFactory('SystemDomainService')
    var service = { index }
    return service

    function index() {
      return $http.get(url(), { cache }).then(res => res.data)
    }
  }
})()
