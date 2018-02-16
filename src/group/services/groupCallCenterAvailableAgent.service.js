;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterAvailableAgentService',
      GroupCallCenterAvailableAgentService
    )

  function GroupCallCenterAvailableAgentService($http, Route) {
    var url = Route.api('/services/groups/callcenters/agents')
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
