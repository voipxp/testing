;(function() {
  angular.module('odin.group').factory('UserCallRecordsService', Service)

  function Service($http, Route, UtilityService) {
    var url = Route.api('/callrecords/users')
    var service = {
      hourly: hourly,
      daily: daily,
      detail: detail,
      details: details,
      stats: stats,
      get: get,
      related: related,
      summary: summary
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

    function related(userId, startTime, endTime, related) {
      return $http
        .get(url('related'), {
          params: {
            startTime: startTime.toJSON(),
            endTime: endTime.toJSON(),
            relatedCallIdReason: related,
            userId: userId
          }
        })
        .then(function(response) {
          return response.data
        })
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
        .then(function(response) {
          return response.data
        })
    }
  }
})()
