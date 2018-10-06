;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('EnterpriseEnterpriseTrunkAvailableUserService', Service)

  function Service($http, Route) {
    var service = { index: index }
    var url = Route.api2('/service-providers/enterprise-trunks/available-users')
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
