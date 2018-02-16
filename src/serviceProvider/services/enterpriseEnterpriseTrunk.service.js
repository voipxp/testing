;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('EnterpriseEnterpriseTrunkService', Service)

  function Service($http, Route) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    service.options = {
      orderingAlgorithm: [
        'Ordered Load Balancing',
        'Overflow',
        'Most Idle',
        'Least Idle'
      ],
      routeExhaustionAction: ['None', 'Forward'],
      routingTypes: ['priorityWeightedRouting', 'orderedRouting']
    }
    return service

    function url(serviceProviderId, trunkName) {
      return Route.api('/services/enterprises')(
        serviceProviderId,
        'enterprisetrunk',
        'trunks',
        trunkName
      )
    }

    function index(serviceProviderId) {
      return $http.get(url(serviceProviderId)).then(function(response) {
        return response.data
      })
    }

    function store(serviceProviderId, obj) {
      return $http.post(url(serviceProviderId), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, trunkName) {
      return $http
        .get(url(serviceProviderId, trunkName))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, trunkName, trunk) {
      return $http
        .put(url(serviceProviderId, trunkName), trunk)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, trunkName) {
      return $http
        .delete(url(serviceProviderId, trunkName))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
