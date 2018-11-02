;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderTrunkGroupCallCapacityReportService', Service)

  function Service($http, Route) {
    var service = { show: show }
    service.options = {}
    var url = Route.api('/service-providers/trunk-groups/call-capacity/reports')
    return service

    function show(serviceProviderId) {
      return $http
        .get(url(), { params: { serviceProviderId: serviceProviderId } })
        .then(function(response) {
          return response.data
        })
    }
  }
})()
