import angular from 'angular'

angular
  .module('odin.api')
  .factory('GroupCallCenterForcedForwardingService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/groups/call-centers/forced-forwarding')
  var service = { show: show, update: update }
  service.options = { audioMessageSource: ['File', 'URL', 'Default'] }
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
