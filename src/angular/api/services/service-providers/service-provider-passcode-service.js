import angular from 'angular'

angular
  .module('odin.api')
  .factory('ServiceProviderPasscodeService', ServiceProviderPasscodeService)

ServiceProviderPasscodeService.$inject = ['$http', 'Route', 'CacheFactory']
function ServiceProviderPasscodeService($http, Route, CacheFactory) {
  var cache = CacheFactory('ServiceProviderPasscodeService')
  var service = { show, update }
  var url = Route.api('/service-providers/passcode-rules')
  return service

  function show(serviceProviderId) {
    return $http
      .get(url(), { cache, params: { serviceProviderId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
