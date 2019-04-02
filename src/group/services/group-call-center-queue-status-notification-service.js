import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupCallCenterQueueStatusNotificationService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/queue-status-notifications')
  var service = { show: show, update: update }
  service.options = {
    numberOfCallsThreshold: { min: 1, max: 525 },
    waitingTimeOfCallsThreshold: { min: 1, max: 7200 }
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
