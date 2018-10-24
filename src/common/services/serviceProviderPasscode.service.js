;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderPasscodeService', ServiceProviderPasscodeService)

  function ServiceProviderPasscodeService($http, Route, CacheFactory) {
    var cache = CacheFactory('ServiceProviderPasscodeService')
    var service = { show, update }
    var url = Route.api('/service-providers/passcode-rules')
    return service

    function show(serviceProviderId) {
      return $http
        .get(url(), { cache, params: { serviceProviderId } })
        .then(res => res.data)
    }

    function update(serviceProviderId, obj) {
      return $http.put(url(), obj).then(res => res.data)
    }
  }
})()
