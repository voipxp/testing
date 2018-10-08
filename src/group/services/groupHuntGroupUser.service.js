;(function() {
  angular
    .module('odin.group')
    .factory('GroupHuntGroupUserService', GroupHuntGroupUserService)

  function GroupHuntGroupUserService($http, Route) {
    var url = Route.api2('/groups/hunt-groups/users')

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
})()
