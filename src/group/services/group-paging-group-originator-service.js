import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupPagingGroupOriginatorService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { available: available, assigned: assigned, update: update }
  var url = Route.api('/groups/paging/originators')
  return service

  function available(serviceProviderId, groupId) {
    return $http
      .get(url('available'), {
        params: { serviceProviderId: serviceProviderId, groupId: groupId }
      })
      .then(function(response) {
        return response.data
      })
  }

  function assigned(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, users) {
    var object = { serviceUserId: serviceUserId, originators: users }
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
