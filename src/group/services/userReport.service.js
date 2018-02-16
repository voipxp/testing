;(function() {
  angular.module('odin.group').factory('UserReportService', UserReportService)

  function UserReportService($http, Route) {
    var service = { index: index, show: show }
    return service

    function url(serviceProviderId, groupId, userId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'reports',
        'users'
      )(userId)
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, userId) {
      return $http
        .get(url(serviceProviderId, groupId, userId))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
