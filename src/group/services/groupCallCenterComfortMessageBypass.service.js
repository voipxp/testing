;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterComfortMessageBypassService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/comfort-message-bypass')
    var service = { show: show, update: update }
    service.options = {
      callWaitingAgeThresholdSeconds: { min: 1, max: 120 },
      ringTimeBeforePlayingAnnouncementSeconds: { min: 0, max: 120 }
    }
    return service

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
