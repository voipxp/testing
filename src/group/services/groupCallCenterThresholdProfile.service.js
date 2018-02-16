;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupCallCenterThresholdProfileService',
      GroupCallCenterThresholdProfileService
    )

  function GroupCallCenterThresholdProfileService($http, Route) {
    var url = Route.api('/services/groups/callcenters/thresholdprofiles')
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
