;(function() {
  angular
    .module('odin.common')
    .factory('GroupPasswordService', GroupPasswordService)

  function GroupPasswordService($http, Route, CacheFactory) {
    var cache = CacheFactory('GroupPasswordService')
    var service = { show, update }
    var url = Route.api2('/groups/password-rules')
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
})()
