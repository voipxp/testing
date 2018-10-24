;(function() {
  angular.module('odin.common').factory('GroupService', GroupService)

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
        .then(res => res.data)
    }

    function store(serviceProviderId, group) {
      return $http.post(url(), group).then(res => {
        clearCache()
        return res.data
      })
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), { cache, params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function update(serviceProviderId, group) {
      return $http.put(url(), group).then(res => {
        clearCache()
        return res.data
      })
    }

    function destroy(serviceProviderId, groupId) {
      return $http
        .delete(url(), { params: { serviceProviderId, groupId } })
        .then(res => {
          clearCache()
          return res.data
        })
    }
  }
})()
