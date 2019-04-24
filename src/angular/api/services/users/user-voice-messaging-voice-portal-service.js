import angular from 'angular'

angular
  .module('odin.api')
  .factory('UserVoiceMessagingVoicePortalService', Service)

Service.$inject = ['$http', 'Route']
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

  function update(userId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
