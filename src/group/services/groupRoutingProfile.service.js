;(function() {
  angular
    .module('odin.common')
    .factory('GroupRoutingProfileService', GroupRoutingProfileService)

  function GroupRoutingProfileService($http, CacheFactory, Route) {
    var cache = CacheFactory('GroupRoutingProfileService')
    var service = { show, update }
    var url = Route.api2('/groups/routing-profile')
    return service

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(), { params: { serviceProviderId, groupId } })
        .then(res => res.data)
    }

    function update(serviceProviderId, groupId, routingProfile) {
      return $http
        .put(url(), { serviceProviderId, groupId, routingProfile })
        .then(res => {
          cache.removeAll()
          return res.data
        })
    }
  }
})()
