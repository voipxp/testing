import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupEnterpriseTrunkAvailableTrunkGroupService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index: index }
  var url = Route.api('/groups/enterprise-trunks/available-trunk-groups')
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
