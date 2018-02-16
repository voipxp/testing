;(function() {
  angular
    .module('odin.serviceProvider')
    .factory(
      'ServiceProviderTrunkGroupCallCapacityService',
      ServiceProviderTrunkGroupCallCapacityService
    )

  function ServiceProviderTrunkGroupCallCapacityService($http, Route) {
    var service = { show: show, update: update }
    service.options = {}
    return service

    function url(serviceProviderId) {
      return Route.api('/services/serviceproviders')(
        serviceProviderId,
        'trunkgroup',
        'callcapacity'
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
