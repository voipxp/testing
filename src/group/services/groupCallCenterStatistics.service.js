;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterStatisticsService',
      GroupCallCenterStatisticsService
    )

  function GroupCallCenterStatisticsService($http, Route) {
    var _url = Route.api('/services/groups/callcenters/statistics')
    var service = { show: show }

    return service

    function url(serviceUserId) {
      return _url(serviceUserId)
    }

    function show(serviceUserId, start, end) {
      return $http
        .get(url(serviceUserId), { params: { start: start, end: end } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
