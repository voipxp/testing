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

    var url = Route.api('/service-providers/enterprise-trunks')
    return service

    function index(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId: serviceProviderId } })
        .then(function(response) {
          return response.data
        })
    }

    function store(serviceProviderId, obj) {
      return $http.post(url(), obj).then(function(response) {
        return response.data
      })
    }

    function show(serviceProviderId, enterpriseTrunkName) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            enterpriseTrunkName: enterpriseTrunkName
          }
        })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, enterpriseTrunkName, trunk) {
      return $http.put(url(), trunk).then(function(response) {
        return response.data
      })
    }

    function destroy(serviceProviderId, enterpriseTrunkName) {
      return $http
        .delete(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            enterpriseTrunkName: enterpriseTrunkName
          }
        })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
