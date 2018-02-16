;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('EnterpriseEnterpriseTrunkUserService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      update: update,
      destroy: destroy
    }
    return service

    function url(serviceProviderId, trunkName) {
      return Route.api('/services/enterprises')(
        serviceProviderId,
        'enterprisetrunk',
        'trunks',
        trunkName,
        'users'
      )
    }

    function index(serviceProviderId, trunkName) {
      return $http
        .get(url(serviceProviderId, trunkName))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, trunkName, obj) {
      return $http
        .post(url(serviceProviderId, trunkName), obj)
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, trunkName, obj) {
      return $http
        .put(url(serviceProviderId, trunkName), obj)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, trunkName, obj) {
      return $http
        .delete(url(serviceProviderId, trunkName), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
