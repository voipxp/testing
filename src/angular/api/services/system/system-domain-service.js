import angular from 'angular'

angular.module('odin.api').factory('SystemDomainService', SystemDomainService)

SystemDomainService.$inject = ['$http', 'Route']
function SystemDomainService($http, Route) {
  var url = Route.api('/system/domains')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
