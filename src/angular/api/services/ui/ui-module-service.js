import angular from 'angular'

angular.module('odin.api').factory('UiModuleService', UiModuleService)

UiModuleService.$inject = ['$http', 'Route', '$rootScope']
function UiModuleService($http, Route, $rootScope) {
  const service = { index }
  const route = Route.api('/ui/modules')
  return service

  function index() {
    return $http.get(route())
  }
}
