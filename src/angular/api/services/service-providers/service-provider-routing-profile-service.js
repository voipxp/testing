import angular from 'angular'

angular
  .module('odin.api')
  .factory(
    'ServiceProviderRoutingProfileService',
    ServiceProviderRoutingProfileService
  )

ServiceProviderRoutingProfileService.$inject = ['$http', 'Route']
function ServiceProviderRoutingProfileService($http, Route) {
  var service = { show, update }
  var url = Route.api('/service-providers/routing-profile')
  return service

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, routingProfile) {
    return $http
      .put(url(), { serviceProviderId, routingProfile })
      .then(response => {
        return response.data
      })
  }
}
