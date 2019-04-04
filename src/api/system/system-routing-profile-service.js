import angular from 'angular'

angular
  .module('odin.api')
  .factory('SystemRoutingProfileService', SystemRoutingProfileService)

SystemRoutingProfileService.$inject = ['$http', 'CacheFactory', 'Route']
function SystemRoutingProfileService($http, CacheFactory, Route) {
  var url = Route.api('/system/routing-profile')
  var cache = CacheFactory('SystemRoutingProfileService')
  var service = { index }
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}
