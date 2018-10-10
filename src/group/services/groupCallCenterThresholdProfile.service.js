;(function() {
  angular
    .module('odin.group')
    .factory('GroupCallCenterThresholdProfileService', Service)

  function Service($http, Route) {
    var url = Route.api2('/groups/call-centers/threshold-profiles')
    var service = { index: index }
    return service

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(), {
          params: { serviceProviderId: serviceProviderId, groupId: groupId }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
