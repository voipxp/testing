;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanPinholeDigitPlanRedirectingService',
      GroupOutgoingCallingPlanPinholeDigitPlanRedirectingService
    )

  function GroupOutgoingCallingPlanPinholeDigitPlanRedirectingService(
    $http,
    Route
  ) {
    var service = { show: show, update: update }

    service.options = { permissions: ['Ignore', 'Allow'] }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'pinholedigitplan', 'redirecting')
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
