import angular from 'angular'

angular
  .module('odin.common')
  .factory('GroupExtensionService', GroupExtensionService)

GroupExtensionService.$inject = ['$http', 'CacheFactory', 'Route']
function GroupExtensionService($http, CacheFactory, Route) {
  var service = { show, update }
  var cache = CacheFactory('GroupExtensionService')
  var url = Route.api('/groups/extensions')
  return service

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { cache, params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, groupId, object) {
    return $http.put(url(), object).then(response => response.data)
  }
}
