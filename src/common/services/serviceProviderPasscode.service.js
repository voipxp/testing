;(function() {
  angular
    .module('odin.common')
    .factory('ServiceProviderPasscodeService', ServiceProviderPasscodeService)

  function ServiceProviderPasscodeService($http, Route, CacheFactory) {
    var cache = CacheFactory('ServiceProviderPasscodeService')
    var service = { show: show, update: update }
    return service

    function url(serviceProviderId) {
      var _url = Route.api('serviceproviders', serviceProviderId)('passcodes')
      return _url
    }

    function show(serviceProviderId) {
      return $http
        .get(url(serviceProviderId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, obj) {
      return $http.put(url(serviceProviderId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
