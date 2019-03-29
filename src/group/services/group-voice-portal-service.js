import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupVoicePortalService', GroupVoicePortalService)

GroupVoicePortalService.$inject = ['$http', 'Route']
function GroupVoicePortalService($http, Route) {
  var service = { show: show, update: update }
  var url = Route.api('/groups/voice-messaging/voice-portal')
  service.options = { voicePortalExternalRoutingScope: ['System', 'Group'] }

  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceProviderId, groupId, obj) {
    return $http.put(url(), obj).then(function(response) {
      return response.data
    })
  }
}
