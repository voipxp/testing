import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupOutgoingCallingPlanAuthorizationCodeService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, destroy }
  var url = Route.api('/groups/calling-plans/outgoing/authorization-codes')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(object) {
    return $http.post(url(), object).then(response => response.data)
  }

  function destroy(data) {
    return $http.delete(url(), { data }).then(response => response.data)
  }
}
