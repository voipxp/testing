;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterQueueStatusService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/status')
    var service = { show: show }

    return service

    function show(serviceUserId) {
      return $http
        .get(url(), { params: { serviceUserId: serviceUserId } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
