import angular from 'angular'

angular.module('odin.api').factory('UserOutgoingCallingPlanRedirectingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update, bulkIndex, bulkUpdate }
  var url = Route.api('/users/calling-plans/outgoing/redirecting')
  return service

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }

  function update(userId, object) {
    return $http.put(url(), object).then(response => response.data)
  }

  function bulkIndex(serviceProviderId, groupId) {
    return $http
      .get(url('bulk'), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function bulkUpdate(data) {
    return $http.put(url('bulk'), data).then(response => response.data)
  }
}
