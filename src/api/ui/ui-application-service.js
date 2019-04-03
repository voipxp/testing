import angular from 'angular'

angular.module('odin.api').factory('UiApplicationService', UiApplicationService)

UiApplicationService.$inject = ['$http', 'Route']
function UiApplicationService($http, Route) {
  const url = Route.api('/ui/applications')
  const service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
