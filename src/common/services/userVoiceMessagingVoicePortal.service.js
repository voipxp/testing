;(function() {
  angular
    .module('odin.common')
    .factory(
      'UserVoiceMessagingVoicePortalService',
      UserVoiceMessagingVoicePortalService
    )

  function UserVoiceMessagingVoicePortalService($http, Route) {
    var service = { show: show, update: update }
    service.options = { mediaTypes: ['WMA', 'WAV', '3GP', 'MOV'] }
    return service

    function url(id) {
      return Route.api('/services/users')(id, 'voicemessaging', 'voiceportal')
    }

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
