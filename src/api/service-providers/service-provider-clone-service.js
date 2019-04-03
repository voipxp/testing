import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderCloneService', Service)

Service.$inject = ['$http', 'Route', '$rootScope']
function Service($http, Route, $rootScope) {
  var service = { all }
  var url = Route.api('/service-providers/clone/service-provider')
  return service

  function all(serviceProviderId, object) {
    return $http.put(url(), { ...object, serviceProviderId }).then(response => {
      $rootScope.$emit('ServiceProviderService:updated')
      return response.data
    })
  }
}
