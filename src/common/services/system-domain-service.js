import angular from 'angular'

angular
  .module('odin.common')
  .factory('SystemDomainService', SystemDomainService)

SystemDomainService.$inject = ['$http', 'CacheFactory', 'Route']
function SystemDomainService($http, CacheFactory, Route) {
  var url = Route.api('/system/domains')
  var cache = CacheFactory('SystemDomainService')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}
