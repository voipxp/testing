;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderPhoneDirectoryService', Service)

  function Service($http, Route) {
    var url = Route.api2('/service-providers/phone-directory')
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
})()
