;(function() {
  angular.module('odin.common').factory('CloneServiceProviderService', Service)

  function Service($http, Route, $rootScope) {
    var service = { all }
    var url = Route.api2('/service-providers/clone/service-provider')
    return service

    function all(serviceProviderId, obj) {
      return $http.put(url(), { ...obj, serviceProviderId }).then(res => {
        $rootScope.$emit('ServiceProviderService:updated')
        return res.data
      })
    }
  }
})()
