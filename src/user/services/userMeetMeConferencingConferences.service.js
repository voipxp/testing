;(function() {
  angular
    .module('odin.user')
    .factory('UserMeetMeConferencingConferencesService', Service)

  function Service($http, Route) {
    var url = Route.api2('/users/meet-me-conferencing')

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
      return $http
        .get(url('bridges'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function index(userId) {
      return $http
        .get(url('conferences'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function store(userId, bridgeId, obj) {
      return $http.post(url('conferences'), obj).then(function(response) {
        return response.data
      })
    }

    function show(userId, conferenceId, bridgeId) {
      return $http
        .get(url('conferences'), {
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
      return $http.put(url('conferences'), obj).then(function(response) {
        return response.data
      })
    }

    function destroy(userId, conferenceId, bridgeId) {
      return $http
        .delete(url('conferences'), {
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
  }
})()
