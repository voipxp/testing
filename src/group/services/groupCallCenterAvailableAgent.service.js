;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterAvailableAgentService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/agents/available')
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
