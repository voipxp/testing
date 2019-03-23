import angular from 'angular'
angular.module('odin.system').factory('SystemCollaborateService', service)

service.$inject = ['$http', 'Route']
function service($http, Route) {
  var url = Route.api('/system/collaborate')
  var service = { show, update }
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
    return $http.get(url()).then(res => res.data)
  }

  function update(obj) {
    return $http.put(url(), obj).then(res => res.data)
  }
}
