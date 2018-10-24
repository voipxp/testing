;(function() {
  angular
    .module('odin.common')
    .factory('UserVoiceMessagingVoicePortalService', Service)

  function Service($http, Route) {
    var url = Route.api('/users/voice-messaging/voice-portal')

    var service = { show: show, update: update }
    service.options = { mediaTypes: ['WMA', 'WAV', '3GP', 'MOV'] }
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
  }
})()
