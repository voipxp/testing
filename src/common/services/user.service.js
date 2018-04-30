;(function() {
  angular.module('odin.common').factory('UserService', UserService)

  function UserService($http, Route, CacheFactory) {
    var service = {
      index: index,
      store: store,
      show: show,
      update: update,
      destroy: destroy,
      bulk: bulk
    }
    var cache = CacheFactory('UserService')
    var url = Route.api('users')

    return service

    function index(serviceProviderId, groupId, extended) {
      return $http
        .get(url(), {
          params: {
            serviceProviderId: serviceProviderId,
            groupId: groupId,
            extended: extended
          },
          cache: cache
        })
        .then(function(response) {
          return response.data || []
        })
    }

    function store(serviceProviderId, groupId, user) {
      user.serviceProviderId = serviceProviderId
      user.groupId = groupId
      return $http.post(url(), user).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function show(userId) {
      return $http.get(url(userId), { cache: cache }).then(function(response) {
        return response.data
      })
    }

    function update(userId, user) {
      return $http.put(url(userId), user).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }

    function bulk(data) {
      return $http
        .put(url(), data)
        .then(function(response) {
          return response.data
        })
        .finally(function() {
          cache.removeAll()
        })
    }

    function destroy(userId) {
      return $http.delete(url(userId)).then(function(response) {
        cache.removeAll()
        return response.data
      })
    }
  }
})()
