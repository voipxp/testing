import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderTrunkGroupCallCapacityReportService', Service)

Service.$inject = ['$http', 'Route']
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
