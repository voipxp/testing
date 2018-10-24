;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterAvailableSupervisorService',
      GroupCallCenterAvailableSupervisorService
    )

  function GroupCallCenterAvailableSupervisorService($http, Route) {
    var url = Route.api('/groups/call-centers/supervisors/available')
    var service = { index: index }

    return service

    function index(serviceProviderId, groupId, callCenterType) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            callCenterType: callCenterType
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
