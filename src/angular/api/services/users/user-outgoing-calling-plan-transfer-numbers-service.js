import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserOutgoingCallingPlanTransferNumbersService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  var url = Route.api('/users/calling-plans/outgoing/transfer-numbers')
  return service

  function show(userId) {
    return $http
      .get(url(), { params: { userId } })
      .then(response => response.data)
  }

  function update(userId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
