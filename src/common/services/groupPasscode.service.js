;(function() {
  angular
    .module('odin.common')
    .factory('GroupPasscodeService', GroupPasscodeService)

  function GroupPasscodeService($http, Route, CacheFactory) {
    var cache = CacheFactory('GroupPasscodeService')
    var service = { show: show, update: update }
    return service

    function url(serviceProviderId, groupId) {
      var _url = Route.api(
        'serviceproviders',
        serviceProviderId,
        'groups',
        groupId
      )('passcodes')
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
