import angular from 'angular'

angular
  .module('odin.group')
  .factory('GroupTrunkGroupCallCapacityService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show: show, update: update }
  service.options = {}
  var url = Route.api('/groups/trunk-groups/call-capacity')
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

  function update(serviceProviderId, groupId, obj) {
    return $http.put(url(), obj).then(function(response) {
      return response.data
    })
  }
}
