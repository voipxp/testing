import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupTrunkGroupUserService', GroupTrunkGroupUserService)

GroupTrunkGroupUserService.$inject = ['$http', 'Route']
function GroupTrunkGroupUserService($http, Route) {
  var service = { index: index, hosted: hosted }
  var url = Route.api('/groups/trunk-groups/users')
  service.options = {}
  return service

  function index(serviceProviderId, groupId, name) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          name: name
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function hosted(serviceProviderId, groupId, name) {
    return $http
      .get(url('hosted'), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          name: name
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
