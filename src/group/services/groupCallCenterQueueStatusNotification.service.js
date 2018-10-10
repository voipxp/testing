;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterQueueStatusNotificationService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/queue-status-notifications')
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

    function update(serviceUserId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
