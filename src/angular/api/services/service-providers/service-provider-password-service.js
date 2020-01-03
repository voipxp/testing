import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderPasswordService', ServiceProviderPasswordService)

ServiceProviderPasswordService.$inject = ['$http', 'Route']
function ServiceProviderPasswordService($http, Route) {
  var service = { show }	
  var url = Route.api('/service-providers/password-rules')
  return service

  function show( serviceProviderId ) {
    return $http
      .get(url(), { params: { serviceProviderId} })
      .then(response => response.data)
  }
}
