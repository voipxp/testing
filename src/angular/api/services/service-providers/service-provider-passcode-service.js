import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderPasscodeService', ServiceProviderPasscodeService)

ServiceProviderPasscodeService.$inject = ['$http', 'Route']
function ServiceProviderPasscodeService($http, Route) {
  var service = { show, update }
  var url = Route.api('/service-providers/passcode-rules')
  return service

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
