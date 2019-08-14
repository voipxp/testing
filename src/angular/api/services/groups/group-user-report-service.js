import angular from 'angular'

angular.module('odin.api').factory('GroupUserReportService', GroupUserReportService)

GroupUserReportService.$inject = ['$http', 'Route']
function GroupUserReportService($http, Route) {
  var service = { index: index, show: show }
  var url = Route.api('/groups/reports/users')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function show(userId) {
    return $http.get(url(), { params: { userId } }).then(response => response.data)
  }
}
