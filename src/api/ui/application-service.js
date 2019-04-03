import angular from 'angular'

angular.module('odin.api').factory('ApplicationService', ApplicationService)

ApplicationService.$inject = ['$http', 'Route']
function ApplicationService($http, Route) {
  const url = Route.api('/ui/applications')
  const service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
