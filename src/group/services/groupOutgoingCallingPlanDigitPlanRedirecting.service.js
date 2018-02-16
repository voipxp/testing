;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanDigitPlanRedirectingService',
      GroupOutgoingCallingPlanDigitPlanRedirectingService
    )

  function GroupOutgoingCallingPlanDigitPlanRedirectingService($http, Route) {
    var service = { show: show, update: update }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'digitplan', 'redirecting')
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
