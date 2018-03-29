;(function() {
  angular.module('odin.common').factory('GroupService', GroupService)

  function GroupService($http, Route, CacheFactory, $rootScope) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy
    }
    var cache = CacheFactory('GroupService')

    $rootScope.$on('GroupService:updated', clearCache)

    return service

    function clearCache() {
      cache.removeAll()
    }

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )()
    }

    function index(serviceProviderId) {
      return $http
        .get(url(serviceProviderId), { cache: cache })
        .then(function(response) {
          return response.data || []
        })
    }

    function store(serviceProviderId, group) {
      return $http.post(url(serviceProviderId), group).then(function(response) {
        clearCache()
        return response.data
      })
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, group) {
      return $http
        .put(url(serviceProviderId, group.groupId), group)
        .then(function(response) {
          clearCache()
          return response.data
        })
    }

    function destroy(serviceProviderId, groupId) {
      return $http
        .delete(url(serviceProviderId, groupId))
        .then(function(response) {
          clearCache()
          return response.data
        })
    }
  }
})()
