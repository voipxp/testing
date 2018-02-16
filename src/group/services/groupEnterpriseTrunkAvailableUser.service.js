;(function() {
  angular
    .module('odin.group')
    .factory(
      'GroupEnterpriseTrunkAvailableUserService',
      GroupEnterpriseTrunkAvailableUserService
    )

  function GroupEnterpriseTrunkAvailableUserService($http, Route) {
    var service = { index: index }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'enterprisetrunk',
        'users'
      )
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
