;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupOutgoingCallingPlanDigitPlanCallMeNowService',
      GroupOutgoingCallingPlanDigitPlanCallMeNowService
    )

  function GroupOutgoingCallingPlanDigitPlanCallMeNowService($http, Route) {
    var service = { show: show, update: update }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('callingplans', 'outgoing', 'digitplan', 'callmenow')
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
