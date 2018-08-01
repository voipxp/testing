;(function() {
  angular
    .module('odin.common')
    .factory('GroupRoutingProfileService', GroupRoutingProfileService)

  function GroupRoutingProfileService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupRoutingProfileService')
    var service = {
      show: show,
      update: update
    }
    return service

    function url(serviceProviderId, groupId) {
      return Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId,
        'routingprofile'
      )()
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId))
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, name) {
      return $http
        .put(url(serviceProviderId, groupId) + '/' + name)
        .then(function(response) {
          cache.removeAll()
          return response.data
        })
    }
  }
})()
