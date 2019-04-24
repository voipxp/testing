import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupCallCenterComfortMessageBypassService', Service)

Service.$inject = ['$http', 'Route']
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

  function update(serviceUserId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
