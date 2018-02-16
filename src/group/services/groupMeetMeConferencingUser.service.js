;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupMeetMeConferencingUserService',
      GroupMeetMeConferencingUserService
    )

  function GroupMeetMeConferencingUserService($http, Route) {
    var url = Route.api('/services/groups/meetmeconferencing/users')

    var service = { index: index }
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
