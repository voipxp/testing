import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupHuntGroupUserService', GroupHuntGroupUserService)

GroupHuntGroupUserService.$inject = ['$http', 'Route']
function GroupHuntGroupUserService($http, Route) {
  var url = Route.api('/groups/hunt-groups/users')

  var service = { index: index }
  return service

  function index(serviceUserId, serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
