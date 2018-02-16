;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterQueueStatusNotificationService',
      GroupCallCenterQueueStatusNotificationService
    )

  function GroupCallCenterQueueStatusNotificationService($http, Route) {
    var _url = Route.api(
      '/services/groups/callcenters/queuestatusnotifications'
    )
    var service = { show: show, update: update }
    service.options = {
      numberOfCallsThreshold: { min: 1, max: 525 },
      waitingTimeOfCallsThreshold: { min: 1, max: 7200 }
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
