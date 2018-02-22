;(function() {
  angular
    .module('odin.user')
    .factory('UserCollaborateService', UserCollaborateService)

  function UserCollaborateService($http, Route) {
    var url = Route.api('/services/users/collaborate')

    var service = {
      bridge: bridge,
      regenerate: regenerate,
      show: show,
      update: update
    }

    service.options = {
      maximumBridgeParticipantsMin: 3,
      maximumBridgeParticipantsMax: 999999,
      roomIdLengthMax: 15,
      instantRoomIdleTimeoutSecondsMin: 1,
      instantRoomIdleTimeoutSecondsMax: 3600,
      roomMaximumDurationMinutesMin: 1,
      roomMaximumDurationMinutesMax: 7200,
      roomMaximumParticipantsMin: 3,
      roomMaximumParticipantsMax: 30
    }
    return service

    function bridge(userId) {
      return $http.get(url(userId) + '/bridge').then(function(response) {
        return response.data
      })
    }
    function show(userId) {
      return $http.get(url(userId) + '/myroom').then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId) + '/myroom', obj).then(function(response) {
        return response.data
      })
    }
    function regenerate(userId, roomId) {
      return $http
        .put(url(userId) + '/regenerate/' + roomId)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
