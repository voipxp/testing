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
      .then(res => res.data)
  }

  function update(serviceProviderId, groupId, obj) {
    return $http.put(url(), obj).then(res => res.data)
  }
}
