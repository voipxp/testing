import angular from 'angular'

angular.module('odin.api').factory('UserCallCenterService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/users/call-center')
  var service = { show: show, update: update, dnis: dnis }
  service.options = {
    skillLevel: { minimum: 1, maximum: 20 },
    agentACDState: ['Sign-In', 'Sign-Out', 'Available', 'Unavailable', 'Wrap-Up'],
    guardTimerSeconds: { minimum: 1, maximum: 25 },
    numberConsecutiveBouncedCallsToForceAgentUnavailable: {
      minimum: 1,
      maximum: 5
    }
  }

  return service

  function show(userId) {
    return $http.get(url(), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }

  function dnis(userId) {
    return $http.get(url('dnis'), { params: { userId: userId } }).then(function(response) {
      return response.data
    })
  }
}
