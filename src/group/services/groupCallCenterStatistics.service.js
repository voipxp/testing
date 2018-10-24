;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterStatisticsService', Service)

  function Service($http, Route) {
    var url = Route.api('/groups/call-centers/statistics')
    var service = { show: show }

    return service

    function show(serviceUserId, start, end) {
      return $http
        .get(url(), {
          params: { serviceUserId: serviceUserId, start: start, end: end }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
