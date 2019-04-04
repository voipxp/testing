import angular from 'angular'

angular.module('odin.api').factory('GroupNightForwardingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/night-forwarding')

  var service = {
    index: index,
    update: update
  }
  service.options = {
    activationMode: ['Auto On', 'On', 'Off']
  }

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
