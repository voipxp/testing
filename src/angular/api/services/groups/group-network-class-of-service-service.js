import angular from 'angular'
angular.module('odin.api').factory('GroupNetworkClassOfServiceService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/network-class-of-services')
  var service = { show: show, select: select, update: update }
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), {
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
        return response.data
      })
  }
}
