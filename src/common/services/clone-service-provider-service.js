import angular from 'angular'

angular.module('odin.common').factory('CloneServiceProviderService', Service)

Service.$inject = ['$http', 'Route', '$rootScope']
function Service($http, Route, $rootScope) {
  var service = { all }
  var url = Route.api('/service-providers/clone/service-provider')
  return service

  function all(serviceProviderId, obj) {
    return $http.put(url(), { ...obj, serviceProviderId }).then(res => {
      $rootScope.$emit('ServiceProviderService:updated')
      return res.data
    })
  }
}
