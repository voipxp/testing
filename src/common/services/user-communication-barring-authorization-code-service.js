import angular from 'angular'

angular
  .module('odin.common')
  .factory('UserCommunicationBarringAuthorizationCodeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, create, destroy }
  var url = Route.api('/users/communication-barring/authorization-codes')
  return service

  function index(userId) {
    return $http.get(url(), { params: { userId } }).then(res => res.data)
  }

  function create(userId, obj) {
    return $http.post(url(), obj).then(res => res.data)
  }

  function destroy(userId, code) {
    return $http
      .delete(url(), { params: { userId, code } })
      .then(res => res.data)
  }
}
