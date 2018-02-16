;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterThresholdService', GroupCallCenterThresholdService)

  function GroupCallCenterThresholdService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/thresholds')
    var service = { show: show, update: update }

    service.options = {
      thresholdCurrentCallsInQueue: { min: 1, max: 525 },
      thresholdCurrentLongestWaitingCall: { min: 1, max: 86400 },
      thresholdAverageEstimatedWaitTime: { min: 1, max: 86400 },
      thresholdAverageHandlingTime: { min: 1, max: 86400 },
      thresholdAverageSpeedOfAnswer: { min: 1, max: 86400 }
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
