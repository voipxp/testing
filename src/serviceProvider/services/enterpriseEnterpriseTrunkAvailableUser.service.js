;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('EnterpriseEnterpriseTrunkAvailableUserService', Service)

  function Service($http, Route) {
    var service = { index: index }
    return service

    function url(serviceProviderId) {
      return Route.api('/services/enterprises')(
        serviceProviderId,
        'enterprisetrunk',
        'users'
      )
    }

    function index(serviceProviderId) {
      return $http.get(url(serviceProviderId)).then(function(response) {
        return response.data
      })
    }
  }
})()
