import angular from 'angular'

angular
  .module('odin.api')
  .factory('EnterpriseEnterpriseTrunkAvailableUserService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { index: index }
  var url = Route.api('/service-providers/enterprise-trunks/available-users')
  return service

  function index(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId: serviceProviderId } })
      .then(function(response) {
        return response.data
      })
  }
}
