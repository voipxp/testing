;(function() {
  angular
    .module('odin.group')
    .factory('UserCallRecordsService', UserCallRecordsService)

  function UserCallRecordsService($http, Route, $location, UtilityService) {
    var url = Route.api('/callrecords/users')
    var service = {
      hourly: hourly,
      daily: daily,
      detail: detail,
      details: details,
      stats: stats,
      get: get,
      open: open
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

    function open(serviceProviderId, groupId, userId, startTime, endTime) {
      Route.open(
        'users',
        serviceProviderId,
        groupId,
        userId,
        'premiumCallRecords'
      )(startTime && startTime.toJSON(), endTime && endTime.toJSON()).hash(null)
    }
  }
})()
