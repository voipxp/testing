;(function() {
  angular
    .module('odin.common')
    .factory('UserVoiceMessagingService', UserVoiceMessagingService)

  function UserVoiceMessagingService($http, Route) {
    var service = { show: show, update: update }
    service.options = {
      processing: [
        'Unified Voice and Email Messaging',
        'Deliver To Email Address Only'
      ]
    }
    return service

    function url(id) {
      return Route.api('/services/users')(id, 'voicemessaging')
    }

    function show(id) {
      return $http.get(url(id)).then(function(response) {
        return response.data
      })
    }

    function update(id, obj) {
      return $http.put(url(id), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
