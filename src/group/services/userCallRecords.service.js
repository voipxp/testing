;(function() {
  angular
    .module('odin.group')
    .factory('UserCallRecordsService', UserCallRecordsService)

  function UserCallRecordsService($http, Route, $location, UtilityService) {
    var url = Route.api('/callrecords/users')
    var service = { hourly: hourly, daily: daily, detail: detail, get: get }

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

    function get(userIds, startTime, endTime, reportType) {
      userIds = UtilityService.castArray(userIds)
      return $http
        .get(url(reportType.toLowerCase()), {
          params: {
            startTime: startTime,
            endTime: endTime,
            userIds: userIds.join(',')
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
