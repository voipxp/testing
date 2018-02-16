;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterQueueStatusService',
      GroupCallCenterQueueStatusService
    )

  function GroupCallCenterQueueStatusService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/status')
    var service = { show: show }

    return service

    function url(serviceUserId) {
      return _url(serviceUserId)
    }

    function show(serviceUserId) {
      return $http.get(url(serviceUserId)).then(function(response) {
        return response.data
      })
    }
  }
})()
