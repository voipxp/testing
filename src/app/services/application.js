import angular from 'angular'

angular.module('odin.app').factory('Application', Application)

Application.$inject = ['$http', 'Route']
function Application($http, Route) {
  const url = Route.api('/ui/applications')
  const service = { index }
  return service

  function index() {
    return $http.get(url()).then(res => res.data)
  }
}
