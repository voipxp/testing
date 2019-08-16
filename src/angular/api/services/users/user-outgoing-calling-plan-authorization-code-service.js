import angular from 'angular'

angular.module('odin.api').factory('UserOutgoingCallingPlanAuthorizationCodeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = {
    show,
    update,
    index,
    create,
    destroy
  }
  var url = Route.api('/users/calling-plans/outgoing/authorization-codes')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }

  function update(userId, object) {
    return $http.put(url(), object).then(response => response.data)
  }

  function index(userId) {
    return $http.get(url('codes'), { params: { userId } }).then(response => response.data)
  }

  function create(userId, object) {
    return $http.post(url('codes'), object).then(response => response.data)
  }

  function destroy(userId, code) {
    return $http
      .delete(url('codes'), { params: { userId, code: code.code || code } })
      .then(function(response) {
        return response.data
      })
  }
}
