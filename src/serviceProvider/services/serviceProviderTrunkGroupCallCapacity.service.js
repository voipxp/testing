;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderTrunkGroupCallCapacityService', Service)

  function Service($http, Route) {
    var service = { show: show, update: update }
    service.options = {}
    var url = Route.api('/service-providers/trunk-groups/call-capacity')
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
