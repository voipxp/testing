;(function() {
  angular.module('odin.group').factory('UserCallRecordsService', Service)

  function Service($http, Route, UtilityService) {
    var url = Route.api2('/users/call-records')
    var service = {
      hourly,
      daily,
      detail,
      details,
      stats,
      related,
      summary,
      get
    }

    service.options = { reportType: ['Hourly', 'Daily'] }

    return service

    function hourly(userIds, startTime, endTime) {
      return get(userIds, startTime, endTime, 'hourly')
    }

    function daily(userIds, startTime, endTime) {
      return get(userIds, startTime, endTime, 'daily')
    }

    function detail(userIds, startTime, endTime) {
      return get(userIds, startTime, endTime, 'detail')
    }

    function details(userIds, startTime, endTime) {
      return get(userIds, startTime, endTime, 'details')
    }

    function stats(userIds, startTime, endTime) {
      return get(userIds, startTime, endTime, 'stats')
    }

    function summary(userIds, startTime, endTime) {
      return get(userIds, startTime, endTime, 'summary')
    }

    function related(userId, startTime, endTime, relatedCallIdReason) {
      return $http
        .get(url('related'), {
          params: {
            startTime: startTime.toJSON(),
            endTime: endTime.toJSON(),
            relatedCallIdReason,
            userId
          }
        })
        .then(res => res.data)
    }

    function get(userIds, startTime, endTime, reportType) {
      userIds = UtilityService.castArray(userIds)
      return $http
        .get(url(reportType.toLowerCase()), {
          params: {
            startTime: startTime.toJSON(),
            endTime: endTime.toJSON(),
            userIds: userIds.join(',')
          }
        })
        .then(res => res.data)
    }
  }
})()
