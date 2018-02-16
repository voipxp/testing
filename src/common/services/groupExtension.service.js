;(function() {
  angular
    .module('odin.common')
    .factory('GroupExtensionService', GroupExtensionService)

  function GroupExtensionService($http, CacheFactory, Route) {
    var service = { show: show, update: update }
    var cache = CacheFactory('GroupExtensionService')
    return service

    function url(serviceProviderId, groupId) {
      var _url = Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('extensions')
      console.log('url', _url)
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
