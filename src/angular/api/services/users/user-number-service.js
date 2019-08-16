import angular from 'angular'

angular.module('odin.api').factory('UserNumberService', UserNumberService)

UserNumberService.$inject = ['$http', 'Route']
function UserNumberService($http, Route) {
  var service = { index: index }
  var url = Route.api('/users/dns')
  return service

  function index(userId) {
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }
}
