;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserMeetMeConferencingDelegatesService',
      UserMeetMeConferencingDelegatesService
    )

  function UserMeetMeConferencingDelegatesService($http, Route) {
    var url = Route.api('/services/users/meetmeconferencing')

    var service = {
      users: users,
      index: index,
      update: update
    }
    service.options = {}
    return service

    function users(userId, bridgeId, conferenceId) {
      return $http
        .get(
          url() +
            '/' +
            userId +
            '/bridges/' +
            bridgeId +
            '/delegates/' +
            conferenceId +
            '/users'
        )
        .then(function(response) {
          return response.data
        })
    }

    function index(userId, bridgeId, conferenceId) {
      return $http
        .get(
          url() +
            '/' +
            userId +
            '/bridges/' +
            bridgeId +
            '/delegates/' +
            conferenceId
        )
        .then(function(response) {
          return response.data
        })
    }
    function update(userId, conferenceId, bridgeId, obj) {
      return $http
        .put(
          url() +
            '/' +
            userId +
            '/bridges/' +
            conferenceId +
            '/delegates/' +
            bridgeId,
          obj
        )
        .then(function(response) {
          return response.data
        })
    }
  }
})()
