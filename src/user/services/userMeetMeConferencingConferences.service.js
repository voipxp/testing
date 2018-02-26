;(function() {
  angular
    .module('odin.user')
    .factory(
      'UserMeetMeConferencingConferencesService',
      UserMeetMeConferencingConferencesService
    )

  function UserMeetMeConferencingConferencesService($http, Route) {
    var url = Route.api('/services/users/meetmeconferencing')

    var service = {
      bridges: bridges,
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      attendeeNotification: [
        'No Notification',
        'Play Tone',
        'Play Recorded Name'
      ]
    }
    return service

    function bridges(userId) {
      return $http.get(url() + '/bridges/' + userId).then(function(response) {
        return response.data
      })
    }

    function index(userId) {
      return $http
        .get(url() + '/' + userId + '/conferences')
        .then(function(response) {
          return response.data
        })
    }

    function store(userId, bridgeId, obj) {
      return $http
        .post(url() + '/' + userId + '/conferences/' + bridgeId, obj)
        .then(function(response) {
          return response.data
        })
    }

    function show(userId, conferenceId, bridgeId) {
      return $http
        .get(
          url() +
            '/' +
            userId +
            '/conferences/' +
            conferenceId +
            '/bridges/' +
            bridgeId
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
            '/conferences/' +
            conferenceId +
            '/bridges/' +
            bridgeId,
          obj
        )
        .then(function(response) {
          return response.data
        })
    }

    function destroy(userId, conferenceId, bridgeId) {
      return $http
        .delete(
          url() +
            '/' +
            userId +
            '/conferences/' +
            conferenceId +
            '/bridges/' +
            bridgeId
        )
        .then(function(response) {
          return response.data
        })
    }
  }
})()
