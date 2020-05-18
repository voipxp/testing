import angular from 'angular'

angular.module('odin.api').factory('UiResourceService', UiResourceService)

UiResourceService.$inject = ['$http', 'Route']
function UiResourceService($http, Route) {
  const url = Route.api('/ui/resources')
  const service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
