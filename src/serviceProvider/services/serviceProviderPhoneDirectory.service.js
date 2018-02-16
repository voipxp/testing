;(function() {
  angular
    .module('odin.serviceProvider')
    .factory('ServiceProviderPhoneDirectoryService', Service)

  function Service($http, Route) {
    var service = { show: show }
    return service

    function url(serviceProviderId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'phonedirectory'
      )()
    }

    function show(serviceProviderId) {
      return $http.get(url(serviceProviderId)).then(function(response) {
        return response.data
      })
    }
  }
})()
