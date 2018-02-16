;(function() {
  angular
    .module('odin.common')
    .factory('UserPortalPasscodeService', UserPortalPasscodeService)

  function UserPortalPasscodeService($http, Route) {
    var service = { show: show, update: update }
    return service

    function url(id) {
      return Route.api('users')(id, 'portalpasscode')
    }

    function show(userId) {
      return $http.get(url(userId)).then(function(response) {
        return response.data
      })
    }

    function update(userId, obj) {
      return $http.put(url(userId), obj).then(function(response) {
        return response.data
      })
    }
  }
})()
