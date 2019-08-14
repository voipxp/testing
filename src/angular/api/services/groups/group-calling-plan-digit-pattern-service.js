import angular from 'angular'

angular.module('odin.api').factory('GroupCallingPlanDigitPatternService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index, store, update, destroy }
  var url = Route.api('/groups/calling-plans/digit-patterns')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, groupId, pattern) {
    return $http.post(url(), pattern).then(response => response.data)
  }

  function update(serviceProviderId, groupId, pattern) {
    return $http.put(url(), pattern).then(response => response.data)
  }

  function destroy(serviceProviderId, groupId, name) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId, name } })
      .then(response => response.data)
  }
}
