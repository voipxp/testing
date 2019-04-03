import angular from 'angular'

angular.module('odin.user').factory('UserCallRecordsService', Service)

Service.$inject = ['$http', 'Route', 'UtilityService']
function Service($http, Route, UtilityService) {
  var url = Route.api('/users/call-records')
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
      .then(response => response.data)
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
      .then(response => response.data)
  }
}
