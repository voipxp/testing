import angular from 'angular'

angular.module('odin.api').factory('GroupMeetMeConferencingPortService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/meet-me-conferencing/ports')

  var service = { index: index, update: update }
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

  function update(object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
