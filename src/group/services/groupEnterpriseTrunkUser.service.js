;(function() {
  angular
    .module('odin.group')
    .factory('GroupEnterpriseTrunkUserService', GroupEnterpriseTrunkUserService)

  function GroupEnterpriseTrunkUserService($http, Route) {
    var service = {
      index: index,
      store: store,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, groupId, trunkName) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'enterprisetrunk',
        'trunks',
        trunkName,
        'users'
      )
    }

    function index(serviceProviderId, groupId, trunkName) {
      return $http
        .get(url(serviceProviderId, groupId, trunkName))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, trunkName, obj) {
      return $http
        .post(url(serviceProviderId, groupId, trunkName), obj)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, trunkName, obj) {
      return $http
        .put(url(serviceProviderId, groupId, trunkName), obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, trunkName, obj) {
      return $http
        .delete(url(serviceProviderId, groupId, trunkName), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
