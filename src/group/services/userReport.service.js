;(function() {
  angular.module('odin.group').factory('UserReportService', UserReportService)

  function UserReportService($http, Route) {
    var service = { index: index, show: show }
    var url = Route.api2('/groups/reports/users')
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function show(userId) {
      return $http.get(url(), { params: { userId } }).then(res => res.data)
    }
  }
})()
