import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupCallCenterThresholdProfileService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/threshold-profiles')
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
