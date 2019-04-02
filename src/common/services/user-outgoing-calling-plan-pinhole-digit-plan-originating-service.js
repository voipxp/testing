import angular from 'angular'

angular
  .module('odin.common')
  .factory('UserOutgoingCallingPlanPinholeDigitPlanOriginatingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  service.options = {
    userPermissions: [
      'Ignore',
      'Allow',
      'Authorization Code Required',
      'Transfer To First Transfer Number',
      'Transfer To Second Transfer Number',
      'Transfer To Third Transfer Number'
    ]
  }
  var url = Route.api(
    '/users/calling-plans/outgoing/pinhole-digit-plan/originating'
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
