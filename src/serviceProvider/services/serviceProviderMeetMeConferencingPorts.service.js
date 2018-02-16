;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderMeetMeConferencingPortsService', Service)

  function Service($http, Route) {
    var service = { show: show, update: update }
    return service

    function url(serviceProviderId) {
      return Route.api('/services/serviceproviders')(
        serviceProviderId,
        'meetmeconferencing',
        'ports'
      )
    }
    function show(serviceProviderId) {
      return $http.get(url(serviceProviderId)).then(function(response) {
        return response.data
      })
    }

    function update(serviceProviderId, obj) {
      return $http.put(url(serviceProviderId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
