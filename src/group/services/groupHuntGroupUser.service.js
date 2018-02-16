;(function() {
  angular
    .module('odin.group')
    .factory('GroupHuntGroupUserService', GroupHuntGroupUserService)

  function GroupHuntGroupUserService($http, Route) {
    var url = Route.api('/services/groups/huntgroups')

    var service = { index: index }
    return service

    function index(userId, serviceProviderId, groupId) {
      return $http
        .get(url(userId, 'users'), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
