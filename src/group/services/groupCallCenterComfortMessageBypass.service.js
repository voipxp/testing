;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterComfortMessageBypassService',
      GroupCallCenterComfortMessageBypassService
    )

  function GroupCallCenterComfortMessageBypassService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/comfortmessagebypass')
    var service = { show: show, update: update }
    service.options = {
      callWaitingAgeThresholdSeconds: { min: 1, max: 120 },
      ringTimeBeforePlayingAnnouncementSeconds: { min: 0, max: 120 }
    }
    return service

    function url(serviceUserId) {
      return _url(serviceUserId)
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(serviceUserId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
