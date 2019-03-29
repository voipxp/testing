import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupEnterpriseTrunkAvailableUserService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index: index }
  var url = Route.api('/groups/enterprise-trunks/available-users')
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
