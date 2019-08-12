import angular from 'angular'

angular.module('odin.api').factory('ServiceProviderServiceService', service)

service.$inject = ['$http', 'Route', '$rootScope']
function service($http, Route, $rootScope) {
  var service = { show, assignable, update }
  var url = Route.api('/service-providers/services')
  return service

  function show(serviceProviderId) {
    return $http
      .get(url(), { params: { serviceProviderId } })
      .then(response => response.data)
  }

  function assignable(serviceProviderId) {
    return $http
      .get(url('assignable'), { params: { serviceProviderId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, services) {
    return $http
      .put(url(), { ...services, serviceProviderId })
      .then(response => {
        $rootScope.$emit('ServiceProviderServiceService:updated')
        return response.data
      })
  }
}
