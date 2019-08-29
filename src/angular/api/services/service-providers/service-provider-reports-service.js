import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderReportsService', ServiceProviderReportsService)

ServiceProviderReportsService.$inject = ['$http', 'Route']
function ServiceProviderReportsService($http, Route) {
  var url = Route.api('/service-providers/reports')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
