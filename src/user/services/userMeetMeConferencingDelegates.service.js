;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserMeetMeConferencingDelegatesService',
      UserMeetMeConferencingDelegatesService
    )

  function UserMeetMeConferencingDelegatesService($http, Route) {
    var url = Route.api2('/users/meet-me-conferencing/delegates')

    var service = {
      users: users,
      index: index,
      update: update
    }
    service.options = {}
    return service

    function users(userId, bridgeId, conferenceId) {
      return $http
        .get(url('users'), {
          params: {
            userId: userId,
            conferenceId: conferenceId,
            bridgeId: bridgeId
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function index(userId, bridgeId, conferenceId) {
      return $http
        .get(url(), {
          params: {
            userId: userId,
            conferenceId: conferenceId,
            bridgeId: bridgeId
          }
        })
        .then(function(response) {
          return response.data
        })
    }
    function update(userId, conferenceId, bridgeId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
