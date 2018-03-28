;(function() {
  angular.module('odin.common').factory('CloneServiceProviderService', Service)

  function Service($http, Route, CacheFactory) {
    var service = { all: all }
    var cache = CacheFactory('ServiceProviderService')
    return service

    function url(serviceProviderId, path) {
      return Route.api('/clone/serviceproviders')(serviceProviderId, path)
    }

    function all(serviceProviderId, obj) {
      return $http.put(url(serviceProviderId), obj).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
