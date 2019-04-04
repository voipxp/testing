import angular from 'angular'
angular.module('odin.api').factory('GroupNetworkClassOfServiceService', Service)

Service.$inject = ['$http', 'CacheFactory', 'Route']
function Service($http, CacheFactory, Route) {
  var cache = CacheFactory('GroupNetworkClassOfServiceService')
  var url = Route.api('/groups/network-class-of-services')
  var service = { show: show, select: select, update: update }
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), {
        cache: cache,
        params: {
          serviceProviderId: serviceProviderId,
          groupId: groupId
        }
      })
      .then(function(response) {
        return response.data
      })
  }

  function select(serviceProviderId, groupId, name) {
    return $http
      .post(url(), {
        serviceProviderId: serviceProviderId,
        groupId: groupId,
        name: name
      })
      .then(function(response) {
        cache.removeAll()
        return response.data
      })
  }

  function update(serviceProviderId, groupId, services) {
    return $http
      .put(url(), {
        serviceProviderId: serviceProviderId,
        groupId: groupId,
        services: services
      })
      .then(function(response) {
        cache.removeAll()
        return response.data
      })
  }
}
