;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderTrunkGroupCallCapacityReportService', Service)

  function Service($http, Route) {
    var service = { index: index }
    service.options = {}
    var url = Route.api2(
      '/service-providers/trunk-groups/call-capacity/reports'
    )
    return service

    function index(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId: serviceProviderId } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
