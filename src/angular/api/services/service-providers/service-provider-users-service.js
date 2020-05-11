import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderUsersService', service)

service.$inject = ['$http', 'Route', '$rootScope']
function service($http, Route, $rootScope) {
  var url = Route.api('/users')
  var service = { index }

  return service

  function index(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }
  
}
