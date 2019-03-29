import angular from 'angular'

angular.module('odin.group').factory('GroupEnterpriseTrunkService', Service)

Service.$inject = ['$http', 'Route']
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

  var url = Route.api('/groups/enterprise-trunks')
  return service

  function index(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function store(serviceProviderId, groupId, obj) {
    return $http.post(url(), obj).then(function(response) {
      return response.data
    })
  }

  function show(serviceProviderId, groupId, enterpriseTrunkName) {
    return $http
      .get(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          enterpriseTrunkName: enterpriseTrunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceProviderId, groupId, enterpriseTrunkName, trunk) {
    return $http.put(url(), trunk).then(function(response) {
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId, enterpriseTrunkName) {
    return $http
      .delete(url(), {
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId,
          enterpriseTrunkName: enterpriseTrunkName
        }
      })
      .then(function(response) {
        return response.data
      })
  }
}
