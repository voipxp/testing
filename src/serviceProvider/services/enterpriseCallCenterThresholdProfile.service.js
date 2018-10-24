;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('EnterpriseCallCenterThresholdProfileService', Service)

  function Service($http, Route) {
    var url = Route.api('/service-providers/call-centers/threshold-profiles')
    var service = { index: index }
    return service

    function index(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId: serviceProviderId } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
