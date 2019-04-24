import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderMeetMeConferencingPortsService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var service = { show: show, update: update }
  var url = Route.api('/service-providers/meet-me-conferencing/ports')
  return service

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId: serviceProviderId } })
      .then(function(response) {
        return response.data
      })
  }

  function update(serviceProviderId, object) {
    return $http.put(url(), object).then(function(response) {
      return response.data
    })
  }
}
