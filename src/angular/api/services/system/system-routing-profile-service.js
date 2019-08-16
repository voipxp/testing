import angular from 'angular'

angular.module('odin.api').factory('SystemRoutingProfileService', SystemRoutingProfileService)

SystemRoutingProfileService.$inject = ['$http', 'Route']
function SystemRoutingProfileService($http, Route) {
  var url = Route.api('/system/routing-profile')
  var service = { index }
  return service

  function index() {
    return $http.get(url()).then(response => response.data)
  }
}
