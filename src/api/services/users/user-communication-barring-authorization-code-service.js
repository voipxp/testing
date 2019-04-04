import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserCommunicationBarringAuthorizationCodeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, create, destroy }
  var url = Route.api('/users/communication-barring/authorization-codes')
  return service

  function index(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }

  function create(userId, object) {
    return $http.post(url(), object).then(response => response.data)
  }

  function destroy(userId, code) {
    return $http
      .delete(url(), { params: { userId, code } })
      .then(response => response.data)
  }
}
