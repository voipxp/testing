;(function() {
  angular
    .module('odin.user')
    .factory('UserCallCenterSettingsService', UserCallCenterSettingsService)

  function UserCallCenterSettingsService($http, Route) {
    var url = Route.api('/services/users/callcenter/settings')
    var service = { show: show, update: update }
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
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
