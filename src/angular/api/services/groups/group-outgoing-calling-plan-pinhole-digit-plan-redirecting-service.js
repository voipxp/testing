import angular from 'angular'

angular
  .module('odin.api')
  .factory(
    'GroupOutgoingCallingPlanPinholeDigitPlanRedirectingService',
    Service
  )

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show, update }
  var url = Route.api(
    '/groups/calling-plans/outgoing/pinhole-digit-plan/redirecting'
  )
  service.options = { permissions: ['Ignore', 'Allow'] }
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
