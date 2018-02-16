;(function() {
  angular
    .module('odin.group')
    .factory('GroupEnterpriseTrunkService', GroupEnterpriseTrunkService)

  function GroupEnterpriseTrunkService($http, Route) {
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

    function url(serviceProviderId, groupId, trunkName) {
      return Route.api('/services/groups')(
        serviceProviderId,
        groupId,
        'enterprisetrunk',
        'trunks',
        trunkName
      )
    }

    function index(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, groupId, obj) {
      return $http
        .post(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }

    function show(serviceProviderId, groupId, trunkName) {
      return $http
        .get(url(serviceProviderId, groupId, trunkName))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, trunkName, trunk) {
      return $http
        .put(url(serviceProviderId, groupId, trunkName), trunk)
        .then(function(response) {
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId, trunkName) {
      return $http
        .delete(url(serviceProviderId, groupId, trunkName))
        .then(function(response) {
          return response.data
        })
    }
  }
})()
