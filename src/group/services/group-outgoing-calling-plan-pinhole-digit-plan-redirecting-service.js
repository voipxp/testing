import angular from 'angular'

angular
  .module('odin.group')
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
      .then(res => res.data)
  }

  function update(serviceProviderId, groupId, obj) {
    return $http.put(url(), obj).then(res => res.data)
  }
}
