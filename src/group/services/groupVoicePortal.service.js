;(function() {
  angular
    .module('odin.group')
    .factory('GroupVoicePortalService', GroupVoicePortalService)

  function GroupVoicePortalService($http, Route) {
    var service = { show: show, update: update }
    service.options = { voicePortalExternalRoutingScope: ['System', 'Group'] }

    return service

    function url(serviceProviderId, groupId) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'voicemessaging',
        'voiceportal'
      )
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
