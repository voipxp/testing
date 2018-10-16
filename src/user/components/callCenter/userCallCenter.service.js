;(function() {
  angular.module('odin.user').factory('UserCallCenterService', Service)

  function Service($http, Route) {
    var url = Route.api2('/users/call-center')
    var service = { show: show, update: update, dnis: dnis }
    service.options = {
      skillLevel: { minimum: 1, maximum: 20 },
      agentACDState: [
        'Sign-In',
        'Sign-Out',
        'Available',
        'Unavailable',
        'Wrap-Up'
      ],
      guardTimerSeconds: { minimum: 1, maximum: 25 },
      numberConsecutiveBouncedCallsToForceAgentUnavailable: {
        minimum: 1,
        maximum: 5
      }
    }

    return service

    function show(userId) {
      return $http
        .get(url(), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(userId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }

    function dnis(userId) {
      return $http
        .get(url('dnis'), { params: { userId: userId } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()