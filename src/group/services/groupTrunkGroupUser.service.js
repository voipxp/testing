;(function() {
  angular
    .module('odin.group')
    .factory('GroupTrunkGroupUserService', GroupTrunkGroupUserService)

  function GroupTrunkGroupUserService($http, Route) {
    var service = { index: index, hosted: hosted }
    service.options = {}
    return service

    function url(serviceProviderId, groupId, trunkName, type) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'trunkgroup',
        'trunks',
        trunkName,
        'users',
        type
      )
    }

    function index(serviceProviderId, groupId, trunkName) {
      return $http
        .get(url(serviceProviderId, groupId, trunkName))
        .then(function(response) {
          return response.data
        })
    }

    function hosted(serviceProviderId, groupId, trunkName) {
      return $http
        .get(url(serviceProviderId, groupId, trunkName, 'hosted'))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
