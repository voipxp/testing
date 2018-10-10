;(function() {
  angular
    .module('odin.group')
    .factory('GroupEnterpriseTrunkAvailableTrunkGroupService', Service)

  function Service($http, Route) {
    var service = { index: index }
    var url = Route.api2('/groups/enterprise-trunks/available-trunk-groups')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
