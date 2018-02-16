;(function() {
  angular
    .module('odin.common')
    .factory('GroupPasswordService', GroupPasswordService)

  function GroupPasswordService($http, Route, CacheFactory) {
    var cache = CacheFactory('GroupPasswordService')
    var service = { show: show, update: update }
    return service

    function url(serviceProviderId, groupId) {
      var _url = Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('passwords')
      return _url
    }

    function show(serviceProviderId, groupId) {
      return $http
        .get(url(serviceProviderId, groupId), { cache: cache })
        .then(function(response) {
          return response.data
        })
    }

    function update(serviceProviderId, groupId, obj) {
      return $http
        .put(url(serviceProviderId, groupId), obj)
        .then(function(response) {
          return response.data
        })
    }
  }
})()
