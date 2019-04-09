import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderReportsService', ServiceProviderReportsService)

ServiceProviderReportsService.$inject = ['$http', 'Route', 'CacheFactory']
function ServiceProviderReportsService($http, Route, CacheFactory) {
  var url = Route.api('/service-providers/reports')
  var service = { index }
  var cache = CacheFactory('ServiceProviderReportsService')
  return service

  function index() {
    return $http.get(url(), { cache }).then(response => response.data)
  }
}
