;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterThresholdService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/thresholds')
    var service = { show: show, update: update }

    service.options = {
      thresholdCurrentCallsInQueue: { min: 1, max: 525 },
      thresholdCurrentLongestWaitingCall: { min: 1, max: 86400 },
      thresholdAverageEstimatedWaitTime: { min: 1, max: 86400 },
      thresholdAverageHandlingTime: { min: 1, max: 86400 },
      thresholdAverageSpeedOfAnswer: { min: 1, max: 86400 }
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
