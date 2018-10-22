;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanPinholeDigitPlanRedirectingService',
      Service
    )

  function Service($http, Route) {
    var service = { show, update }
    var url = Route.api2(
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
})()
