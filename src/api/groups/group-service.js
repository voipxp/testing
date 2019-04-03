import angular from 'angular'

angular.module('odin.api').factory('GroupService', GroupService)

GroupService.$inject = ['$http', 'Route', 'CacheFactory', '$rootScope']
function GroupService($http, Route, CacheFactory, $rootScope) {
  var service = { index, store, show, update, destroy }
  var cache = CacheFactory('GroupService')
  var url = Route.api('/groups')

  $rootScope.$on('GroupService:updated', clearCache)

  return service

  function clearCache() {
    cache.removeAll()
  }

  function index(serviceProviderId) {
    return $http
      .get(url(), { cache, params: { serviceProviderId } })
      .then(response => response.data)
  }

  function store(serviceProviderId, group) {
    return $http.post(url(), group).then(response => {
      clearCache()
      return response.data
    })
  }

  function show(serviceProviderId, groupId) {
    return $http
      .get(url(), { cache, params: { serviceProviderId, groupId } })
      .then(response => response.data)
  }

  function update(serviceProviderId, group) {
    return $http.put(url(), group).then(response => {
      clearCache()
      return response.data
    })
  }

  function destroy(serviceProviderId, groupId) {
    return $http
      .delete(url(), { params: { serviceProviderId, groupId } })
      .then(response => {
        clearCache()
        return response.data
      })
  }
}
