import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderPhoneDirectoryService', Service)

Service.$inject = ['$http', 'Route']
function Service($http, Route) {
  var url = Route.api('/service-providers/phone-directory')
  var service = { show: show }
  return service

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId: serviceProviderId } })
      .then(function(response) {
        return response.data
      })
  }
}
