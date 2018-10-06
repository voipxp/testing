;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderMeetMeConferencingPortsService', Service)

  function Service($http, Route) {
    var service = { show: show, update: update }
    var url = Route.api2('/service-providers/meet-me-conferencing/ports')
    return service

    function show(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId: serviceProviderId } })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, obj) {
      return $http.put(url(), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
