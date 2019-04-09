import angular from 'angular'

angular.module('odin.api').factory('GroupCallCenterDnisService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/dnis')
  var service = { show: show, update: update }
  service.options = { promoteCallsFromPriority: { min: 1, max: 1800 } }
  return service

  function show(serviceUserId) {
    return $http
      .get(url(), { params: { serviceUserId: serviceUserId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceUserId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
