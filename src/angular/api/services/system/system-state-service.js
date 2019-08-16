import angular from 'angular'

angular.module('odin.api').factory('SystemStateService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/system/states-provinces')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
