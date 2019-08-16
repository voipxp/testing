import angular from 'angular'

angular.module('odin.api').factory('GroupRoutingProfileService', GroupRoutingProfileService)

GroupRoutingProfileService.$inject = ['$http', 'Route']
function GroupRoutingProfileService($http, Route) {
  var service = { show, update }
  var url = Route.api('/groups/routing-profile')
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, routingProfile) {
    return $http.put(url(), { serviceProviderId, groupId, routingProfile }).then(response => {
      return response.data
    })
  }
}
