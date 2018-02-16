;(function() {
  angular
    .module('odin.system')
    .factory('SystemCollaborateService', SystemCollaborateService)

  function SystemCollaborateService($http, Route) {
    var url = Route.api('/system/collaborate')
    var service = { show: show, update: update }
    service.options = {
      roomIdLengthMin: 4,
      roomIdLengthMax: 15,
      instantRoomIdleTimeoutSecondsMin: 1,
      instantRoomIdleTimeoutSecondsMax: 3600,
      roomMaximumDurationMinutesMin: 1,
      roomMaximumDurationMinutesMax: 7200,
      roomMaximumParticipantsMin: 3,
      roomMaximumParticipantsMax: 30,
      activeTalkerRefreshIntervalSecondsMin: 1,
      activeTalkerRefreshIntervalSecondsMax: 5,
      hoursMin: 0,
      hoursMax: 23,
      gracePeriodDurationMinutes: [0, 15, 30, 45]
    }

    return service

    function show() {
      return $http.get(url()).then(function(response) {
        return response.data
      })
    }
    function update(obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
