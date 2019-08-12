import angular from 'angular'

angular.module('odin.api').factory('GroupServiceService', Service)

Service.$inject = ['$http', 'Route', '$rootScope']
function Service($http, Route, $rootScope) {
  var service = { show, authorized, available, update, assigned }
  var url = Route.api('/groups/services')

  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  // map this into an easy to access hash
  function available(serviceProviderId, groupId) {
    return $http
      .get(url('available'), {
        params: { serviceProviderId, groupId }
      })
      .then(response => response.data)
      .then(services => {
        var results = {}
        services.forEach(function(service) {
          results[service] = true
        })
        return results
      })
  }
  function assigned(serviceProviderId, groupId, serviceType, serviceName) {
    return $http
      .get(url('assigned'), {
        params: { serviceProviderId, groupId, serviceType, serviceName }
      })
      .then(response => response.data)
  }
  function authorized(serviceProviderId, groupId) {
    return $http
      .get(url('authorized'), {
        params: { serviceProviderId, groupId }
      })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, service) {
    return $http
      .put(url(), { ...service, serviceProviderId, groupId })
      .then(response => {
        $rootScope.$emit('GroupServiceService:updated')
        return response.data
      })
  }
}
