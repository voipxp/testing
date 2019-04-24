import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserOutgoingCallingPlanPinholeDigitPlanCallMeNowService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  service.options = { userPermissions: ['Ignore', 'Allow'] }
  var url = Route.api(
    '/users/calling-plans/outgoing/pinhole-digit-plan/call-me-now'
  )
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
