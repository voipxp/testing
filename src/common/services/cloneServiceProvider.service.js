;(function() {
  angular.module('odin.common').factory('CloneServiceProviderService', Service)

  function Service($http, Route, $rootScope) {
    var service = { all: all }
    return service

    function url(serviceProviderId, path) {
      return Route.api('/clone/serviceproviders')(serviceProviderId, path)
    }

    function all(serviceProviderId, obj) {
      return $http.put(url(serviceProviderId), obj).then(function(response) {
        $rootScope.$emit('ServiceProviderService:updated')
        return response.data
      })
    }
  }
})()
